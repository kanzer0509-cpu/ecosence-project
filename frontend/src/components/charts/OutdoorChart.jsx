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
    labels: ['09시', '10시', '11시', '12시', '13시', '14시', '15시', '16시', '17시', '18시'],
    datasets: [
      {
        label: '기온(℃)',
        data: [21, 22, 23, 24, 25, 26, 26, 25, 23, 20],
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="outdoor-chart-wrapper">
      <Line data={data} options={options} />
    </div>
  );
}