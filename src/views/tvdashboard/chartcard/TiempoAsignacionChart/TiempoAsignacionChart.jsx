import { useMemo } from 'react';
import { useDashboard } from '../../../../context/DashboardContext';
import ChartCard from '../ChartCard';
import AreaChart from '../AreaChart';

const TiempoAsignacionChart = () => {
  const { datosGenerales } = useDashboard();

  const data = useMemo(() => {
    if (!datosGenerales) return { labels: [], datasets: [] };

    return {
      labels: datosGenerales.labels,
      datasets: [
        {
          label: 'Tiempo Total',
          data: datosGenerales.costoTotal,
          borderColor: 'rgba(33, 150, 243, 1)',
          backgroundColor: 'rgba(33, 150, 243, 0.2)',
        },
        {
          label: 'Tiempo Local',
          data: datosGenerales.costoLocal,
          borderColor: 'rgba(156, 39, 176, 1)',
          backgroundColor: 'rgba(156, 39, 176, 0.2)',
        },
        {
          label: 'Tiempo Carretero',
          data: datosGenerales.costoCarretero,
          borderColor: 'rgba(0, 150, 136, 1)',
          backgroundColor: 'rgba(0, 150, 136, 0.2)',
        }
      ]
    };
  }, [datosGenerales]);

  return (
    <ChartCard title="Tiempo Asignación" loading={false} error={null} spinnerColor="info">
      <AreaChart data={data} height="100%" />
    </ChartCard>
  );
};

export default TiempoAsignacionChart;