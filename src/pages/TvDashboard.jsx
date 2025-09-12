import React from 'react';
import ServiciosChart from '../components/ServiciosChart';
import DatosGeneralesChart from '../components/DatosGeneralesChart';
import AsistenciasChart from '../components/AsistenciasChart';
import TiempoAsignacionChart from '../components/TiempoAsignacionChart';
import TiempoArriboChart from '../components/TiempoArriboChart';
import CanceladosChart from '../components/CanceladosChart';

const TvDashboard = () => {
  // Todos los componentes ahora usan AreaChart idéntico a DatosGeneralesChart

  return (
    <div className="tv-dashboard" style={{ height: '100vh', overflow: 'hidden' }}>
      <div className="container-fluid" style={{ height: '100%', padding: '15px' }}>
        <div className="row h-100">
          {/* Fila superior */}
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <ServiciosChart />
          </div>
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <DatosGeneralesChart />
          </div>
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <AsistenciasChart />
          </div>

          {/* Fila inferior */}
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <TiempoAsignacionChart />
          </div>
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <TiempoArriboChart />
          </div>
          <div className="col-lg-4 col-md-6 mb-3" style={{ height: '48vh' }}>
            <CanceladosChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvDashboard;