import useChartData from '../../../../hooks/useChartData';
import ChartCard from '../ChartCard';
import AreaChart from '../AreaChart';
import ApiService from '../../../../services/apiService';

// configuración para futuras apis
const tiempoArriboConfig = {
  apiCall: () => ApiService.fetchDatosGenerales(),
  dataTransformer: (datosGeneralesData) => ({
    labels: datosGeneralesData.labels,
    datasets: [
      {
        label: 'Tiempo Total',
        data: datosGeneralesData.costoTotal,
        borderColor: 'rgba(255, 152, 0, 1)',
        backgroundColor: 'rgba(255, 152, 0, 0.2)',
      },
      {
        label: 'Tiempo Local',
        data: datosGeneralesData.costoLocal,
        borderColor: 'rgba(244, 67, 54, 1)',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
      },
      {
        label: 'Tiempo Carretero',
        data: datosGeneralesData.costoCarretero,
        borderColor: 'rgba(121, 85, 72, 1)',
        backgroundColor: 'rgba(121, 85, 72, 0.2)',
      }
    ]
  })
};

const TiempoArriboChart = () => {
  const { data, loading, error } = useChartData(
    tiempoArriboConfig.apiCall,
    tiempoArriboConfig.dataTransformer
  );

  return (
    <ChartCard title="Tiempo Arribo" loading={loading} error={error} spinnerColor="secondary">
      <AreaChart data={data} height="100%" />
    </ChartCard>
  );
};

export default TiempoArriboChart;