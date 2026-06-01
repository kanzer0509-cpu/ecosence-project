import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function OutdoorChart() {
  const data = {
    labels: ['09시', '12시', '15시', '18시', '21시'],
    datasets: [
      {
        label: '기온(℃)',
        data: [21, 24, 26, 23, 20],
      },
    ],
  };

  return <Line data={data} />;
}