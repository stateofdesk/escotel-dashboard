import useChartData from '../../../../hooks/useChartData';
import ChartCard from '../ChartCard';
import AreaChart from '../AreaChart';
import ApiService from '../../../../services/apiService';

// configuración para futuras apis
const datosGeneralesConfig = {
  apiCall: () => ApiService.fetchDatosGenerales(),
  dataTransformer: (datosGeneralesData) => ({
    labels: datosGeneralesData.labels,
    datasets: [
      {
        label: 'Costo Total',
        data: datosGeneralesData.costoTotal,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'Costo Local',
        data: datosGeneralesData.costoLocal,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Costo Carretero',
        data: datosGeneralesData.costoCarretero,
        borderColor: 'rgba(218, 165, 32, 1)',
        backgroundColor: 'rgba(218, 165, 32, 0.2)',
      }
    ]
  })
};

const DatosGeneralesChart = () => {
  const { data, loading, error } = useChartData(
    datosGeneralesConfig.apiCall,
    datosGeneralesConfig.dataTransformer
  );

  return (
    <ChartCard title="Datos Generales" loading={loading} error={error} spinnerColor="success">
      <AreaChart data={data} height="100%" />
    </ChartCard>
  );
};

export default DatosGeneralesChart;