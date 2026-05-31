import InfoCard from '../components/common/InfoCard';
import { useNoiseStore } from '../stores/useNoiseStore';
import { useAudio } from '../hooks/useAudio';
import { getDbComment } from '../utils/db';
import NoiseChart from '../components/charts/NoiseChart';

export default function SleepPage() {
  const { isMeasuring, currentDb } = useNoiseStore();
  const { startAudio, stopAudio } = useAudio();

  return (
    <section>
      <h2>수면/소음 측정</h2>

      <div>
        <button type="button" onClick={startAudio} disabled={isMeasuring}>
          소음 측정 시작
        </button>

        <button type="button" onClick={stopAudio} disabled={!isMeasuring}>
          측정 종료
        </button>
      </div>

      <p>측정 상태: {isMeasuring ? '측정 중' : '대기 중'}</p>

      <InfoCard
        title="현재 소음"
        value={currentDb === null ? '-- dB' : `${currentDb.toFixed(1)} dB`}
        description={getDbComment(currentDb)}
      />

      <div>
        <h3>소음 변화 그래프</h3>
        <NoiseChart />
      </div>
    </section>
  );
}