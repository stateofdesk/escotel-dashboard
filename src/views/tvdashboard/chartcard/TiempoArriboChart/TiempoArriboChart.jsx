import { useMemo } from 'react';
import { useDashboard } from '../../../../context/DashboardContext';
import ChartCard from '../ChartCard';
import AreaChart from '../AreaChart';

const TiempoArriboChart = () => {
  const { datosGenerales } = useDashboard();

  const data = useMemo(() => {
    if (!datosGenerales) return { labels: [], datasets: [] };

    return {
      labels: datosGenerales.labels,
      datasets: [
        {
          label: 'Tiempo Total',
          data: datosGenerales.costoTotal,
          borderColor: 'rgba(255, 152, 0, 1)',
          backgroundColor: 'rgba(255, 152, 0, 0.2)',
        },
        {
          label: 'Tiempo Local',
          data: datosGenerales.costoLocal,
          borderColor: 'rgba(244, 67, 54, 1)',
          backgroundColor: 'rgba(244, 67, 54, 0.2)',
        },
        {
          label: 'Tiempo Carretero',
          data: datosGenerales.costoCarretero,
          borderColor: 'rgba(121, 85, 72, 1)',
          backgroundColor: 'rgba(121, 85, 72, 0.2)',
        }
      ]
    };
  }, [datosGenerales]);

  return (
    <ChartCard title="Tiempo Arribo" loading={false} error={null} spinnerColor="secondary">
      <AreaChart data={data} height="100%" />
    </ChartCard>
  );
};

export default TiempoArriboChart;