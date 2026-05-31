import { useState } from 'react';

import InfoCard from '../components/common/InfoCard';
import SensorConnectButton from '../components/indoor/SensorConnectButton';

export default function IndoorPage() {
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <section>
      <h2>실내 대시보드</h2>

      <SensorConnectButton
        isConnected={isConnected}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
      />

      <p>센서 상태: {isConnected ? '연결됨' : '연결 안 됨'}</p>

      <div>
        <InfoCard title="실내 온도" value="--℃" description="센서 연결 후 표시됩니다." />
        <InfoCard title="실내 습도" value="--%" description="센서 연결 후 표시됩니다." />
      </div>
    </section>
  );
}