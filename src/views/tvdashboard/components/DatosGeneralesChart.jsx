import { useState, useEffect } from 'react';
import AreaChart from './AreaChart';
import ApiService from '../../../services/apiService';

const DatosGeneralesChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const datosGeneralesData = await ApiService.fetchDatosGenerales(); // Usará día de ayer automáticamente
        const calculatedMetrics = ApiService.calculateMetrics(datosGeneralesData, 'datosGenerales');
        
        // Preparar datos para AreaChart con costos (áreas) y servicios (contador)
        const chartData = {
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
        };

        setData(chartData);
        setMetrics(calculatedMetrics);
      } catch (err) {
        setError('Error al cargar datos generales');
        console.error('DatosGeneralesChart error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Auto-refresh cada 5 minutos
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="card shadow-lg h-100" style={{ borderRadius: '16px' }}>
        <div className="card-header d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', borderRadius: '16px 16px 0 0', height: '60px' }}>
          <h5 className="mb-0 text-center">Datos Generales</h5>
        </div>
        <div className="card-body d-flex justify-content-center align-items-center" style={{ padding: '0 1rem 1rem 1rem', flex: 1 }}>
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card shadow-lg h-100" style={{ borderRadius: '16px' }}>
        <div className="card-header d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', borderRadius: '16px 16px 0 0', height: '60px' }}>
          <h5 className="mb-0 text-center">Datos Generales</h5>
        </div>
        <div className="card-body d-flex justify-content-center align-items-center" style={{ padding: '0 1rem 1rem 1rem', flex: 1 }}>
          <div className="text-center">
            <i className="fa fa-wifi text-danger mb-2" style={{ fontSize: '2rem' }}></i>
            <p className="text-muted">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-lg h-100" style={{ borderRadius: '16px' }}>
      <div className="card-header d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', borderRadius: '16px 16px 0 0', height: '60px' }}>
        <h5 className="mb-0 text-center">Datos Generales</h5>
      </div>
      <div className="card-body d-flex flex-column" style={{ padding: '0 1rem 1rem 1rem', flex: 1 }}>
        <div style={{ flex: 1, width: '100%', marginTop: '-25px', minHeight: '200px' }}>
          <AreaChart 
            data={data}
            title=""
            height="100%"
            type="area"
          />
        </div>
      </div>
    </div>
  );
};

export default DatosGeneralesChart;