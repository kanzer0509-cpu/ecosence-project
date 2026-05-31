interface SensorConnectButtonProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

export default function SensorConnectButton({
  isConnected,
  onConnect,
  onDisconnect,
}: SensorConnectButtonProps) {
  return (
    <button
      type="button"
      onClick={isConnected ? onDisconnect : onConnect}
    >
      {isConnected ? '센서 연결 해제' : '센서 연결'}
    </button>
  );
}