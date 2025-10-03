import { useMemo } from 'react';
import { useDashboard } from '../../../../context/DashboardContext';
import ChartCard from '../ChartCard';
import AreaChart from '../AreaChart';

const CanceladosChart = () => {
  const { datosGenerales } = useDashboard();

  const data = useMemo(() => {
    if (!datosGenerales) return { labels: [], datasets: [] };

    return {
      labels: datosGenerales.labels,
      datasets: [
        {
          label: 'Cancelados Total',
          data: datosGenerales.costoTotal,
          borderColor: 'rgba(244, 67, 54, 1)',
          backgroundColor: 'rgba(244, 67, 54, 0.2)',
        },
        {
          label: 'Cancelados Local',
          data: datosGenerales.costoLocal,
          borderColor: 'rgba(96, 125, 139, 1)',
          backgroundColor: 'rgba(96, 125, 139, 0.2)',
        },
        {
          label: 'Cancelados Carretero',
          data: datosGenerales.costoCarretero,
          borderColor: 'rgba(139, 69, 19, 1)',
          backgroundColor: 'rgba(139, 69, 19, 0.2)',
        }
      ]
    };
  }, [datosGenerales]);

  return (
    <ChartCard title="Cancelados con Costo" loading={false} error={null} spinnerColor="dark">
      <AreaChart data={data} height="100%" />
    </ChartCard>
  );
};

export default CanceladosChart;