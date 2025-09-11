import { useState, useEffect } from 'react';
import AreaChart from './AreaChart';
import ApiService from '../services/apiService';

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
        
        const datosGeneralesData = await ApiService.fetchDatosGenerales();
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
      <div className="card shadow-lg" style={{ borderRadius: '16px' }}>
        <div className="card-header pb-3 pt-4 px-4" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', borderRadius: '16px 16px 0 0' }}>
          <h5 className="mb-1">Datos Generales</h5>
          <p className="text-sm mb-0">
            <i className="fa fa-spinner fa-spin" style={{ color: '#8B0000' }}></i>
            <span className="font-weight-bold ms-1">Cargando datos...</span>
          </p>
        </div>
        <div className="card-body p-4 d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
          <div className="spinner-border text-success" role="status">
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
          <h5 className="mb-1">Datos Generales</h5>
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
      <div className="card-header pb-1 pt-3 px-4" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', borderRadius: '16px 16px 0 0' }}>
        <div className="row align-items-center">
          <div className="col-6">
            <h5 className="mb-1">Datos Generales</h5>
            <p className="text-sm mb-0">
              <i className="fa fa-dollar-sign" aria-hidden="true" style={{ color: '#28a745' }}></i>
              <span className="font-weight-bold ms-1">Costos por Tipo</span>
            </p>
          </div>
          <div className="col-6">
            <div className="row text-center">
              <div className="col-4">
                <small style={{ color: 'rgba(153, 102, 255, 1)' }}>
                  <strong>Total</strong><br/>
                  <span style={{ fontSize: '0.9rem' }}>${(metrics.totalCosto || 0).toLocaleString()}</span><br/>
                  <span style={{ fontSize: '0.8rem' }}>{(metrics.totalServicios || 0).toLocaleString()} serv</span>
                </small>
              </div>
              <div className="col-4">
                <small style={{ color: 'rgba(75, 192, 192, 1)' }}>
                  <strong>Local</strong><br/>
                  <span style={{ fontSize: '0.9rem' }}>${(metrics.costoLocal || 0).toLocaleString()}</span><br/>
                  <span style={{ fontSize: '0.8rem' }}>{(metrics.totalLocal || 0).toLocaleString()} serv</span>
                </small>
              </div>
              <div className="col-4">
                <small style={{ color: 'rgba(218, 165, 32, 1)' }}>
                  <strong>Carretero</strong><br/>
                  <span style={{ fontSize: '0.9rem' }}>${(metrics.costoCarretero || 0).toLocaleString()}</span><br/>
                  <span style={{ fontSize: '0.8rem' }}>{(metrics.totalCarretero || 0).toLocaleString()} serv</span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body" style={{ padding: '0 1rem 1rem 1rem' }}>
        <div style={{ height: '300px', width: '100%', marginTop: '-25px' }}>
          <AreaChart 
            data={data}
            title=""
            height={325}
            type="area"
          />
        </div>
      </div>
    </div>
  );
};

export default DatosGeneralesChart;