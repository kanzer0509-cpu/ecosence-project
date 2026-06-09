import { useState } from 'react';

import InfoCard from '../components/common/InfoCard';
import OutdoorChart from '../components/charts/OutdoorChart';
import { getOutdoorData } from '../services/outdoor';
import { useOutdoorStore } from '../stores/useOutdoorStore';
import { getAqiComment } from '../utils/aqi';
import { searchLocations } from '../services/location';
import {
  getFeelsLikeComment,
  getHumidityComment,
  getPm25Comment,
  getRainComment,
  getTemperatureComment,
  getUvComment,
} from '../utils/comment';

export default function OutdoorPage() {
  const { data, location, setLocation, setData } = useOutdoorStore();
  const [inputLocation, setInputLocation] = useState(location);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchLocation = async () => {
    if (!inputLocation.trim()) {
      alert('검색할 지역을 입력하세요.');
      return;
    }

    try {
      setIsSearching(true);
      const results = await searchLocations(inputLocation);
      setSearchResults(Array.isArray(results) ? results : []);
    } catch (error) {
      console.error('지역 검색 실패:', error);
      alert('지역 검색에 실패했습니다.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = async (selectedLocation) => {
    const locationName = selectedLocation.name;

    setInputLocation(locationName);
    setLocation(locationName);
    setSearchResults([]);

    try {
      setIsLoading(true);

      const outdoorData = await getOutdoorData(locationName);
      setData(outdoorData);
    } catch (error) {
      console.error('선택 지역 데이터 조회 실패:', error);
      alert('선택한 지역의 실외 데이터를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  };
  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      const outdoorData = await getOutdoorData(inputLocation);
      setLocation(inputLocation);
      setData(outdoorData);
    } catch (error) {
      console.error('실외 데이터 조회 실패:', error);
      alert('실외 데이터를 불러오지 못했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('이 브라우저에서는 위치 정보를 지원하지 않습니다.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const locationText = `${latitude},${longitude}`;

        setInputLocation(locationText);
        setLocation(locationText);
      },
      (error) => {
        console.error('위치 정보 조회 실패:', error);
        alert('위치 정보를 가져오지 못했습니다.');
      }
    );
  };

  const displayData = data ?? {
    temperature: 24,
    feelsLike: 25,
    humidity: 55,
    precipitation: 0,
    uv: 4,
    aqi: '좋음',
    pm25: 18,
  };

  return (
    <section className="outdoor-page">
      <div className="outdoor-layout">
        <div className="outdoor-info-panel">
          <h2>실외 정보</h2>

          <InfoCard
            title="기온"
            value={`${displayData.temperature}℃`}
            description={getTemperatureComment(displayData.temperature)}
          />

          <InfoCard
            title="체감온도"
            value={`${displayData.feelsLike ?? displayData.temperature}℃`}
            description={getFeelsLikeComment(
              displayData.feelsLike ?? displayData.temperature
            )}
          />

          <InfoCard
            title="습도"
            value={`${displayData.humidity}%`}
            description={getHumidityComment(displayData.humidity)}
          />

          <InfoCard
            title="PM2.5"
            value={`${displayData.pm25 ?? '--'}㎍/㎥`}
            description={
              displayData.pm25 === undefined
                ? '초미세먼지 정보를 확인 중입니다.'
                : getPm25Comment(displayData.pm25)
            }
          />

          <InfoCard
            title="AQI"
            value={displayData.aqi}
            description={getAqiComment(displayData.aqi)}
          />

          <InfoCard
            title="UV"
            value={displayData.uv}
            description={getUvComment(Number(displayData.uv))}
          />

          <InfoCard
            title="강수량"
            value={`${displayData.precipitation}mm`}
            description={getRainComment(displayData.precipitation)}
          />
        </div>

        <div className="outdoor-right-panel">
          <div className="outdoor-chart-card">
            <h2>실외 환경 그래프</h2>
            <OutdoorChart />
          </div>

          <div className="location-card">
            <h2>위치 설정</h2>

            <p>현재 지역: {location}</p>

            <input
              value={inputLocation}
              onChange={(event) => setInputLocation(event.target.value)}
              placeholder="지역을 입력하세요 예: 창원"
            />

            <div className="location-actions">
              <button type="button" onClick={handleSearchLocation} disabled={isSearching}>
                {isSearching ? '검색 중...' : '지역 검색'}
              </button>
              <button type="button" onClick={handleUseCurrentLocation}>
                GPS
              </button>

              <button type="button" onClick={handleRefresh} disabled={isLoading}>
                {isLoading ? '불러오는 중...' : '새로고침'}
              </button>
            </div>
            {searchResults.length > 0 && (
              <ul className="location-result-list">
                {searchResults.map((item, index) => (
                  <li key={`${item.name}-${index}`}>
                    <button type="button" onClick={() => handleSelectLocation(item)}>
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}