import useChartData from '../../../../hooks/useChartData';
import ChartCard from '../ChartCard';
import AreaChart from '../AreaChart';
import ApiService from '../../../../services/apiService';

// configuración para futuras apis
const serviciosConfig = {
  apiCall: () => ApiService.fetchServicios(),
  dataTransformer: (serviciosData) => ({
    labels: serviciosData.labels,
    datasets: [
      {
        label: 'Costos ($)',
        data: serviciosData.costos,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Asistencias',
        data: serviciosData.asistencias,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      }
    ]
  })
};

const ServiciosChart = () => {
  const { data, loading, error } = useChartData(
    serviciosConfig.apiCall,
    serviciosConfig.dataTransformer
  );

  return (
    <ChartCard title="Servicios" loading={loading} error={error} spinnerColor="primary">
      <AreaChart data={data} height="100%" />
    </ChartCard>
  );
};

export default ServiciosChart;