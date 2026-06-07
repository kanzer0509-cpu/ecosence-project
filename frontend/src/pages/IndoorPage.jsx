import InfoCard from '../components/common/InfoCard';
import SensorConnectButton from '../components/indoor/SensorConnectButton';

import { useBluetooth } from '../hooks/useBluetooth';
import { useSensorStore } from '../stores/useSensorStore';
import {
  getHumidityComment,
  getTemperatureComment,
} from '../utils/comment';

export default function IndoorPage() {
  const { isConnected, data } = useSensorStore();
  const { connectSensor, disconnectSensor } = useBluetooth();

  return (
    <section className="indoor-page">
      <div className="indoor-card">
        <div className="indoor-summary">
          <InfoCard
            title="실내 온도"
            value={data.temperature === null ? '--℃' : `${data.temperature}℃`}
            description={
              data.temperature === null
                ? '센서 연결 후 실내 온도가 표시됩니다.'
                : getTemperatureComment(data.temperature)
            }
          />

          <InfoCard
            title="실내 습도"
            value={data.humidity === null ? '--%' : `${data.humidity}%`}
            description={
              data.humidity === null
                ? '센서 연결 후 실내 습도가 표시됩니다.'
                : getHumidityComment(data.humidity)
            }
          />

          <div className="sensor-status-card">
            <h3>센서 상태</h3>
            <p>{isConnected ? '연결됨' : '연결 안 됨'}</p>

            <SensorConnectButton
              isConnected={isConnected}
              onConnect={connectSensor}
              onDisconnect={disconnectSensor}
            />
          </div>
        </div>

        <div className="indoor-chart-area">
          <h2>실내 온습도 그래프</h2>
          <p>센서 데이터가 연결되면 실시간 그래프가 표시됩니다.</p>
        </div>
      </div>
    </section>
  );
}