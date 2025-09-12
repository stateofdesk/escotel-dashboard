import useChartData from '../../../../hooks/useChartData';
import ChartCard from '../ChartCard';
import AreaChart from '../AreaChart';
import ApiService from '../../../../services/apiService';

// configuración para futuras apis
const canceladosConfig = {
  apiCall: () => ApiService.fetchDatosGenerales(),
  dataTransformer: (datosGeneralesData) => ({
    labels: datosGeneralesData.labels,
    datasets: [
      {
        label: 'Cancelados Total',
        data: datosGeneralesData.costoTotal,
        borderColor: 'rgba(244, 67, 54, 1)',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
      },
      {
        label: 'Cancelados Local',
        data: datosGeneralesData.costoLocal,
        borderColor: 'rgba(96, 125, 139, 1)',
        backgroundColor: 'rgba(96, 125, 139, 0.2)',
      },
      {
        label: 'Cancelados Carretero',
        data: datosGeneralesData.costoCarretero,
        borderColor: 'rgba(139, 69, 19, 1)',
        backgroundColor: 'rgba(139, 69, 19, 0.2)',
      }
    ]
  })
};

const CanceladosChart = () => {
  const { data, loading, error } = useChartData(
    canceladosConfig.apiCall,
    canceladosConfig.dataTransformer
  );

  return (
    <ChartCard title="Cancelados con Costo" loading={loading} error={error} spinnerColor="dark">
      <AreaChart data={data} height="100%" />
    </ChartCard>
  );
};

export default CanceladosChart;