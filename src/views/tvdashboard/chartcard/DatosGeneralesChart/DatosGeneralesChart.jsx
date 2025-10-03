import { useMemo } from 'react';
import { useDashboard } from '../../../../context/DashboardContext';
import ChartCard from '../ChartCard';
import AreaChart from '../AreaChart';

const DatosGeneralesChart = () => {
  const { datosGenerales } = useDashboard();

  const data = useMemo(() => {
    if (!datosGenerales) return { labels: [], datasets: [] };

    return {
      labels: datosGenerales.labels,
      datasets: [
        {
          label: 'Costo Total',
          data: datosGenerales.costoTotal,
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
        },
        {
          label: 'Costo Local',
          data: datosGenerales.costoLocal,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
          label: 'Costo Carretero',
          data: datosGenerales.costoCarretero,
          borderColor: 'rgba(218, 165, 32, 1)',
          backgroundColor: 'rgba(218, 165, 32, 0.2)',
        }
      ]
    };
  }, [datosGenerales]);

  return (
    <ChartCard title="Datos Generales" loading={false} error={null} spinnerColor="success">
      <AreaChart data={data} height="100%" />
    </ChartCard>
  );
};

export default DatosGeneralesChart;