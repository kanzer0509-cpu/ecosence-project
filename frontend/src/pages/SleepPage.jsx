import { useEffect, useState } from 'react';

import InfoCard from '../components/common/InfoCard';
import NoiseChart from '../components/charts/NoiseChart';

import { useAudio } from '../hooks/useAudio';
import { clearSpikes, getSpikes, clearRecordings,  getRecordings } from '../services/indexedDB';
import { useNoiseStore } from '../stores/useNoiseStore';
import { getNoiseComment } from '../utils/comment';

export default function SleepPage() {
  const { mode, isMeasuring, currentDb, setMode, spikes } = useNoiseStore();
  const { startAudio, stopAudio } = useAudio();

  const [savedSpikes, setSavedSpikes] = useState([]);
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const loadSpikes = async () => {
      try {
        const loadedSpikes = await getSpikes();
        const loadedRecordings = await getRecordings();
        setSavedSpikes(loadedSpikes);
        setRecordings(loadedRecordings);
      } catch (error) {
        console.error('스파이크 조회 실패:', error);
      }
    };

    loadSpikes();
  }, []);

  const handleClearSpikes = async () => {
    try {
      await clearSpikes();
      await clearRecordings();
      setSavedSpikes([]);
      setRecordings([]);

      alert('저장된 이상 소음 기록을 초기화했습니다.');
    } catch (error) {
      console.error('스파이크 초기화 실패:', error);
      alert('이상 소음 기록 초기화에 실패했습니다.');
    }
  };

  return (
    <section className="sleep-page">
      <div className="sleep-layout">
        <div className="sleep-chart-card">
          <div className="sleep-top-area">
            <div>
              <h2>소음 변화 그래프</h2>

              <NoiseChart />

              <InfoCard
                title="현재 소음"
                value={
                  currentDb === null
                    ? '-- dB'
                    : `${currentDb.toFixed(1)} dB`
                }
                description={
                  currentDb === null
                    ? '마이크 권한 허용 후 실시간 소음이 표시됩니다.'
                    : getNoiseComment(currentDb)
                }
              />
            </div>

            <div className="sleep-control-card">
              <h3>측정 제어</h3>

              <div className="mode-buttons">
                <button
                  type="button"
                  onClick={() => setMode('normal')}
                  disabled={isMeasuring}
                >
                  일반 소음 측정
                </button>

                <button
                  type="button"
                  onClick={() => setMode('sleep')}
                  disabled={isMeasuring}
                >
                  수면 소음 측정
                </button>
              </div>

              <p>
                현재 모드:
                {mode === 'normal'
                  ? ' 일반 소음 측정'
                  : ' 수면 소음 측정'}
              </p>

              <button
                type="button"
                onClick={startAudio}
                disabled={isMeasuring}
              >
                {mode === 'normal'
                  ? '일반 소음 측정 시작'
                  : '수면 소음 측정 시작'}
              </button>

              <button
                type="button"
                onClick={stopAudio}
                disabled={!isMeasuring}
              >
                {mode === 'normal'
                  ? '일반 소음 측정 종료'
                  : '수면 소음 측정 종료'}
              </button>
            </div>
          </div>
        </div>

        <div className="spike-grid">
          <div className="spike-card">
            <h3>감지된 스파이크</h3>

            {spikes.length === 0 ? (
              <p>감지된 이상 소음이 없습니다.</p>
            ) : (
              <ul>
                {spikes.map((spike, index) => (
                  <li key={index}>
                    {spike.timestamp} - {spike.db} dB
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="spike-card">
            <h3>저장된 스파이크 기록</h3>

            {savedSpikes.length === 0 ? (
              <p>저장된 기록이 없습니다.</p>
            ) : (
              <ul>
                {savedSpikes.map((spike) => (
                  <li key={spike.id}>
                    {spike.timestamp} - {spike.db} dB
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="recording-card">
          <h3>녹음 파일 목록</h3>

          {recordings.length === 0 ? (
            <p>저장된 녹음 파일이 없습니다.</p>
          ) : (
            <ul>
              {recordings.map((recording) => (
                <li key={recording.id}>
                  <p>
                    {recording.timestamp} - {recording.db} dB
                  </p>

                  <audio
                    controls
                    src={URL.createObjectURL(recording.blob)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="button"
          className="clear-spikes-button"
          onClick={handleClearSpikes}
        >
          이상 소음 기록 초기화
        </button>
      </div>
    </section>
  );
}