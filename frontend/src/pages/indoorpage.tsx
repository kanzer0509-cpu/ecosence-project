import InfoCard from '../components/common/InfoCard';
import SensorConnectButton from '../components/indoor/SensorConnectButton';
import { useSensorStore } from '../stores/useSensorStore';

export default function IndoorPage() {
  const { isConnected, data, connect, disconnect } = useSensorStore();

  return (
    <section>
      <h2>실내 대시보드</h2>

      <SensorConnectButton
        isConnected={isConnected}
        onConnect={connect}
        onDisconnect={disconnect}
      />

      <p>센서 상태: {isConnected ? '연결됨' : '연결 안 됨'}</p>

      <div>
        <InfoCard
          title="실내 온도"
          value={data.temperature === null ? '--℃' : `${data.temperature}℃`}
          description="샤오미 미지아 센서 기준 온도입니다."
        />
        <InfoCard
          title="실내 습도"
          value={data.humidity === null ? '--%' : `${data.humidity}%`}
          description={
            data.humidity !== null && data.humidity <= 40
              ? '습도가 낮습니다. 보습을 권장합니다.'
              : '센서 연결 후 실내 습도가 표시됩니다.'
          }
        />
      </div>
    </section>
  );
}