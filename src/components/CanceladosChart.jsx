import { useState, useEffect } from 'react';
import AreaChart from './AreaChart';
import ApiService from '../services/apiService';

const CanceladosChart = () => {
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
        
        // Preparar datos para AreaChart con colores rojos
        const chartData = {
          labels: datosGeneralesData.labels,
          datasets: [
            {
              label: 'Cancelados Total',
              data: datosGeneralesData.costoTotal,
              borderColor: 'rgba(244, 67, 53, 1)',
              backgroundColor: 'rgba(244, 67, 53, 0.2)',
            },
            {
              label: 'Cancelados Local',
              data: datosGeneralesData.costoLocal,
              borderColor: 'rgba(233, 30, 99, 1)',
              backgroundColor: 'rgba(233, 30, 99, 0.2)',
            },
            {
              label: 'Cancelados Carretero',
              data: datosGeneralesData.costoCarretero,
              borderColor: 'rgba(255, 87, 34, 1)',
              backgroundColor: 'rgba(255, 87, 34, 0.2)',
            }
          ]
        };

        setData(chartData);
        setMetrics(calculatedMetrics);
      } catch (err) {
        setError('Error al cargar cancelados');
        console.error('CanceladosChart error:', err);
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
      <div className="card shadow-lg" style={{ borderRadius: '16px' }}>
        <div className="card-header pb-3 pt-4 px-4" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', borderRadius: '16px 16px 0 0' }}>
          <h5 className="mb-1">Cancelados con Costo</h5>
          <p className="text-sm mb-0">
            <i className="fa fa-spinner fa-spin" style={{ color: '#8B0000' }}></i>
            <span className="font-weight-bold ms-1">Cargando datos...</span>
          </p>
        </div>
        <div className="card-body p-4 d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card shadow-lg" style={{ borderRadius: '16px' }}>
        <div className="card-header pb-3 pt-4 px-4" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', borderRadius: '16px 16px 0 0' }}>
          <h5 className="mb-1">Cancelados con Costo</h5>
          <p className="text-sm mb-0">
            <i className="fa fa-exclamation-triangle" style={{ color: '#dc3545' }}></i>
            <span className="font-weight-bold ms-1">Error de conexión</span>
          </p>
        </div>
        <div className="card-body p-4 d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
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
        <h5 className="mb-0 text-center">Cancelados con Costo</h5>
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

export default CanceladosChart;