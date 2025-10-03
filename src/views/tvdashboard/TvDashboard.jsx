import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import useZoom from '../../hooks/useZoom';
import ServiciosChart from './chartcard/ServiciosChart/ServiciosChart';
import DatosGeneralesChart from './chartcard/DatosGeneralesChart/DatosGeneralesChart';
import AsistenciasChart from './chartcard/AsistenciasChart/AsistenciasChart';
import TiempoAsignacionChart from './chartcard/TiempoAsignacionChart/TiempoAsignacionChart';
import TiempoArriboChart from './chartcard/TiempoArriboChart/TiempoArriboChart';
import CanceladosChart from './chartcard/CanceladosChart/CanceladosChart';

const TvDashboard = () => {
  const zoomKey = useZoom();
  const { loading, error, refetch } = useDashboard();

  // loading global
  if (loading) {
    return (
      <div className="tv-dashboard" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: '#666'
      }}>
        <div>
          <div className="spinner-border text-primary me-3" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          Cargando dashboard...
        </div>
      </div>
    );
  }

  // error global
  if (error) {
    return (
      <div className="tv-dashboard" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{ color: '#d32f2f', fontSize: '1.2rem' }}>
          Error al cargar datos: {error.message}
        </div>
        <button className="btn btn-primary" onClick={refetch}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="tv-dashboard" style={{ minHeight: '100vh', overflow: 'auto' }}>
      <div className="container-fluid" style={{ height: '100%', padding: '15px' }}>
        <div className="row h-100">
          {/* fila superior */}
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <ServiciosChart key={zoomKey > 0 ? `servicios-zoom-${zoomKey}` : 'servicios'} />
          </div>
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <DatosGeneralesChart key={zoomKey > 0 ? `datos-zoom-${zoomKey}` : 'datos'} />
          </div>
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <AsistenciasChart key={zoomKey > 0 ? `asistencias-zoom-${zoomKey}` : 'asistencias'} />
          </div>

          {/* fila inferior */}
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <TiempoAsignacionChart key={zoomKey > 0 ? `tiempo-asig-zoom-${zoomKey}` : 'tiempo-asig'} />
          </div>
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <TiempoArriboChart key={zoomKey > 0 ? `tiempo-arribo-zoom-${zoomKey}` : 'tiempo-arribo'} />
          </div>
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <CanceladosChart key={zoomKey > 0 ? `cancelados-zoom-${zoomKey}` : 'cancelados'} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvDashboard;