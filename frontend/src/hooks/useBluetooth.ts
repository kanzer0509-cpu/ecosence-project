import { connectBluetoothSensor } from '../services/bluetooth';
import { useSensorStore } from '../stores/useSensorStore';

export const useBluetooth = () => {
  const { connect, disconnect } = useSensorStore();

  const connectSensor = async () => {
    try {
      await connectBluetoothSensor();
      connect();
    } catch (error) {
      console.error('센서 연결 실패:', error);
      alert('센서 연결에 실패했습니다.');
    }
  };

  const disconnectSensor = () => {
    disconnect();
  };

  return {
    connectSensor,
    disconnectSensor,
  };
};