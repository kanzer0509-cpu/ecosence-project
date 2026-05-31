import { useState } from 'react';

import InfoCard from '../components/common/InfoCard';
import { getOutdoorData } from '../services/outdoor';
import { useOutdoorStore } from '../stores/useOutdoorStore';
import { getAqiComment } from '../utils/aqi';
import OutdoorChart from '../components/charts/OutdoorChart';

export default function OutdoorPage() {
  const { data, location, setLocation, setData } = useOutdoorStore();
  const [inputLocation, setInputLocation] = useState(location);
  const [isLoading, setIsLoading] = useState(false);

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

  const displayData = data ?? {
    temperature: 24,
    humidity: 55,
    precipitation: 0,
    uv: '보통',
    aqi: '좋음',
  };

  return (
    <section>
      <h2>실외 대시보드</h2>

      <div>
        <input
          value={inputLocation}
          onChange={(event) => setInputLocation(event.target.value)}
          placeholder="지역을 입력하세요 예: 창원"
        />

        <button type="button">현재 위치 사용</button>

        <button type="button" onClick={handleRefresh} disabled={isLoading}>
          {isLoading ? '불러오는 중...' : '새로고침'}
        </button>
      </div>

      <p>현재 지역: {location}</p>

      <div>
        <InfoCard
          title="기온"
          value={`${displayData.temperature}℃`}
          description="현재 지역의 기온입니다."
        />
        <InfoCard
          title="습도"
          value={`${displayData.humidity}%`}
          description="현재 지역의 습도입니다."
        />
        <InfoCard
          title="강수량"
          value={`${displayData.precipitation}mm`}
          description="현재 강수량입니다."
        />
        <InfoCard
          title="UV"
          value={displayData.uv}
          description="자외선 지수입니다."
        />
        <InfoCard
          title="AQI"
          value={displayData.aqi}
          description={getAqiComment(displayData.aqi)}
        />
      </div>

      <div>
        <h3>실외 환경 변화 그래프</h3>
        <OutdoorChart />
      </div>
    </section>
  );
}