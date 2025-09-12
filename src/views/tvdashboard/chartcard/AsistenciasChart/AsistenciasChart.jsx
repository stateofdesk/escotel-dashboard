import useChartData from '../../../../hooks/useChartData';
import ChartCard from '../ChartCard';
import AreaChart from '../AreaChart';
import ApiService from '../../../../services/apiService';

// configuración para futuras apis
const asistenciasConfig = {
  apiCall: () => ApiService.fetchDatosGenerales(),
  dataTransformer: (datosGeneralesData) => ({
    labels: datosGeneralesData.labels,
    datasets: [
      {
        label: 'Asistencias Total',
        data: datosGeneralesData.costoTotal,
        borderColor: 'rgba(76, 175, 80, 1)',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
      },
      {
        label: 'Asistencias Local',
        data: datosGeneralesData.costoLocal,
        borderColor: 'rgba(255, 152, 0, 1)',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
      },
      {
        label: 'Asistencias Carretero',
        data: datosGeneralesData.costoCarretero,
        borderColor: 'rgba(233, 30, 99, 1)',
        backgroundColor: 'rgba(233, 30, 99, 0.2)',
      }
    ]
  })
};

const AsistenciasChart = () => {
  const { data, loading, error } = useChartData(
    asistenciasConfig.apiCall,
    asistenciasConfig.dataTransformer
  );

  return (
    <ChartCard title="Asistencias" loading={loading} error={error} spinnerColor="warning">
      <AreaChart data={data} height="100%" />
    </ChartCard>
  );
};

export default AsistenciasChart;