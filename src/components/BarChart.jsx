import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ data, title, height = 300, type = "monthly", color = "success" }) => {
  const colorPalette = {
    primary: { bg: 'rgba(233, 30, 99, 0.8)', border: 'rgba(233, 30, 99, 1)' },
    success: { bg: 'rgba(76, 175, 80, 0.8)', border: 'rgba(76, 175, 80, 1)' },
    info: { bg: 'rgba(26, 115, 232, 0.8)', border: 'rgba(26, 115, 232, 1)' },
    warning: { bg: 'rgba(251, 140, 0, 0.8)', border: 'rgba(251, 140, 0, 1)' },
    danger: { bg: 'rgba(244, 67, 53, 0.8)', border: 'rgba(244, 67, 53, 1)' },
    dark: { bg: 'rgba(38, 38, 38, 0.8)', border: 'rgba(38, 38, 38, 1)' }
  };

  const selectedColor = colorPalette[color] || colorPalette.success;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        backgroundColor: selectedColor.bg,
        borderColor: selectedColor.border,
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold',
        },
        color: '#344767',
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#7b809a',
          font: {
            size: 12,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#7b809a',
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;