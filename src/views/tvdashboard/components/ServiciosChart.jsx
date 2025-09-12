import { useState, useEffect } from 'react';
import AreaChart from './AreaChart';
import ApiService from '../../../services/apiService';

const ServiciosChart = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const serviciosData = await ApiService.fetchServicios(); // Usará día de ayer automáticamente
        const calculatedMetrics = ApiService.calculateMetrics(serviciosData, 'servicios');
        
        // Preparar datos para AreaChart con dos datasets
        const chartData = {
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
        };

        setData(chartData);
        setMetrics(calculatedMetrics);
      } catch (err) {
        setError('Error al cargar datos de servicios');
        console.error('ServiciosChart error:', err);
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
          <h5 className="mb-0 text-center">Servicios</h5>
        </div>
        <div className="card-body d-flex justify-content-center align-items-center" style={{ padding: '0 1rem 1rem 1rem', flex: 1 }}>
          <div className="spinner-border text-primary" role="status">
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
          <h5 className="mb-0 text-center">Servicios</h5>
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
        <h5 className="mb-0 text-center">Servicios</h5>
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

export default ServiciosChart;