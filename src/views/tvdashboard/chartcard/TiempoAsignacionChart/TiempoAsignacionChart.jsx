import useChartData from '../../../../hooks/useChartData';
import ChartCard from '../ChartCard';
import AreaChart from '../AreaChart';
import ApiService from '../../../../services/apiService';

// configuración para futuras apis
const tiempoAsignacionConfig = {
  apiCall: () => ApiService.fetchDatosGenerales(),
  dataTransformer: (datosGeneralesData) => ({
    labels: datosGeneralesData.labels,
    datasets: [
      {
        label: 'Tiempo Total',
        data: datosGeneralesData.costoTotal,
        borderColor: 'rgba(33, 150, 243, 1)',
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
      },
      {
        label: 'Tiempo Local',
        data: datosGeneralesData.costoLocal,
        borderColor: 'rgba(156, 39, 176, 1)',
        backgroundColor: 'rgba(156, 39, 176, 0.2)',
      },
      {
        label: 'Tiempo Carretero',
        data: datosGeneralesData.costoCarretero,
        borderColor: 'rgba(0, 150, 136, 1)',
        backgroundColor: 'rgba(0, 150, 136, 0.2)',
      }
    ]
  })
};

const TiempoAsignacionChart = () => {
  const { data, loading, error } = useChartData(
    tiempoAsignacionConfig.apiCall,
    tiempoAsignacionConfig.dataTransformer
  );

  return (
    <ChartCard title="Tiempo Asignación" loading={loading} error={error} spinnerColor="info">
      <AreaChart data={data} height="100%" />
    </ChartCard>
  );
};

export default TiempoAsignacionChart;