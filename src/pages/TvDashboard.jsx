import React from 'react';
import useZoomResize from '../hooks/useResize';
import ServiciosChart from '../components/ServiciosChart';
import DatosGeneralesChart from '../components/DatosGeneralesChart';
import AsistenciasChart from '../components/AsistenciasChart';
import TiempoAsignacionChart from '../components/TiempoAsignacionChart';
import TiempoArriboChart from '../components/TiempoArriboChart';
import CanceladosChart from '../components/CanceladosChart';

const TvDashboard = () => {
  const zoomKey = useZoomResize();
  
  // Todos los componentes ahora usan AreaChart idéntico a DatosGeneralesChart

  return (
    <div className="tv-dashboard" style={{ minHeight: '100vh', overflow: 'auto' }}>
      <div className="container-fluid" style={{ height: '100%', padding: '15px' }}>
        <div className="row h-100">
          {/* Fila superior */}
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <ServiciosChart key={zoomKey > 0 ? `servicios-zoom-${zoomKey}` : 'servicios'} />
          </div>
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <DatosGeneralesChart key={zoomKey > 0 ? `datos-zoom-${zoomKey}` : 'datos'} />
          </div>
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <AsistenciasChart key={zoomKey > 0 ? `asistencias-zoom-${zoomKey}` : 'asistencias'} />
          </div>

          {/* Fila inferior */}
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