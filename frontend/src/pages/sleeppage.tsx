import InfoCard from '../components/common/InfoCard';
import { useNoiseStore } from '../stores/useNoiseStore';

export default function SleepPage() {
  const { isMeasuring, currentDb, startMeasuring, stopMeasuring } =
    useNoiseStore();

  return (
    <section>
      <h2>수면/소음 측정</h2>

      <div>
        <button type="button" onClick={startMeasuring} disabled={isMeasuring}>
          소음 측정 시작
        </button>

        <button type="button" onClick={stopMeasuring} disabled={!isMeasuring}>
          측정 종료
        </button>
      </div>

      <p>측정 상태: {isMeasuring ? '측정 중' : '대기 중'}</p>

      <InfoCard
        title="현재 소음"
        value={currentDb === null ? '-- dB' : `${currentDb.toFixed(1)} dB`}
        description="마이크 권한 허용 후 실시간 소음이 표시됩니다."
      />

      <div>
        <h3>소음 변화 그래프</h3>
        <p>그래프 영역</p>
      </div>
    </section>
  );
}