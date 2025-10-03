import { useMemo } from 'react';
import { useDashboard } from '../../../../context/DashboardContext';
import ChartCard from '../ChartCard';
import AreaChart from '../AreaChart';

const AsistenciasChart = () => {
  const { datosGenerales } = useDashboard();

  const data = useMemo(() => {
    if (!datosGenerales) return { labels: [], datasets: [] };

    return {
      labels: datosGenerales.labels,
      datasets: [
        {
          label: 'Asistencias Total',
          data: datosGenerales.costoTotal,
          borderColor: 'rgba(76, 175, 80, 1)',
          backgroundColor: 'rgba(76, 175, 80, 0.2)',
        },
        {
          label: 'Asistencias Local',
          data: datosGenerales.costoLocal,
          borderColor: 'rgba(255, 152, 0, 1)',
          backgroundColor: 'rgba(255, 152, 0, 0.2)',
        },
        {
          label: 'Asistencias Carretero',
          data: datosGenerales.costoCarretero,
          borderColor: 'rgba(233, 30, 99, 1)',
          backgroundColor: 'rgba(233, 30, 99, 0.2)',
        }
      ]
    };
  }, [datosGenerales]);

  return (
    <ChartCard title="Asistencias" loading={false} error={null} spinnerColor="warning">
      <AreaChart data={data} height="100%" />
    </ChartCard>
  );
};

export default AsistenciasChart;