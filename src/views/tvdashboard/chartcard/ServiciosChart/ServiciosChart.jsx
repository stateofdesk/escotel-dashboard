import { useMemo } from 'react';
import { useDashboard } from '../../../../context/DashboardContext';
import ChartCard from '../ChartCard';
import AreaChart from '../AreaChart';

const ServiciosChart = () => {
  const { servicios } = useDashboard();

  const data = useMemo(() => {
    if (!servicios) return { labels: [], datasets: [] };

    return {
      labels: servicios.labels,
      datasets: [
        {
          label: 'Costos ($)',
          data: servicios.costos,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: 'Asistencias',
          data: servicios.asistencias,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
        }
      ]
    };
  }, [servicios]);

  return (
    <ChartCard title="Servicios" loading={false} error={null} spinnerColor="primary">
      <AreaChart data={data} height="100%" />
    </ChartCard>
  );
};

export default ServiciosChart;