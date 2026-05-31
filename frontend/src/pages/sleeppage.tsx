import InfoCard from '../components/common/InfoCard';
import { useNoiseStore } from '../stores/useNoiseStore';
import { useAudio } from '../hooks/useAudio';
import { getDbComment } from '../utils/db';
import NoiseChart from '../components/charts/NoiseChart';

export default function SleepPage() {
  const { mode, isMeasuring, currentDb, setMode, spikes } = useNoiseStore();
  const { startAudio, stopAudio } = useAudio();
  
  return (
    <section>
      <h2>수면/소음 측정</h2>

      <div>
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
        {mode === 'normal' ? ' 일반 소음 측정' : ' 수면 소음 측정'}
      </p>

      <div>
        <button type="button" onClick={startAudio} disabled={isMeasuring}>
          {mode === 'normal' ? '일반 소음 측정 시작' : '수면 소음 측정 시작'}
        </button>

        <button type="button" onClick={stopAudio} disabled={!isMeasuring}>
          {mode === 'normal' ? '일반 소음 측정 종료' : '수면 소음 측정 종료'}
        </button>
      </div>

      <p>
        측정 상태: {isMeasuring ? '측정 중' : '대기 중'}
      </p>

      <InfoCard
        title="현재 소음"
        value={currentDb === null ? '-- dB' : `${currentDb.toFixed(1)} dB`}
        description={getDbComment(currentDb)}
      />

      <div>
        <h3>소음 변화 그래프</h3>
        <NoiseChart />
        <div>
          <h3>이상 소음 감지</h3>

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
      </div>
    </section>
  );
}