import React from 'react';
import BarChart from '../components/BarChart';
import AreaChart from '../components/AreaChart';

const TvDashboard = () => {
  const weeklyData = {
    labels: ['01-01', '02-01', '03-01', '04-01', '05-01', '06-01', '07-01'],
  };

  const serviciosAreaData = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: 'Servicios Total',
        data: [100, 120, 110, 130, 140, 125, 135],
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        borderColor: 'rgba(54, 162, 235, 1)',
      },
      {
        label: 'Servicios Local',
        data: [80, 95, 85, 100, 105, 95, 105],
        backgroundColor: 'rgba(75, 192, 192, 0.3)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Servicios Carretero',
        data: [20, 25, 25, 30, 35, 30, 30],
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        borderColor: 'rgba(255, 99, 132, 1)',
      }
    ]
  };

  const costosAreaData = {
    labels: weeklyData.labels,
    datasets: [
      {
        label: 'Costo Total',
        data: [250, 280, 270, 320, 340, 300, 330],
        backgroundColor: 'rgba(153, 102, 255, 0.3)',
        borderColor: 'rgba(153, 102, 255, 1)',
      },
      {
        label: 'Costo Local',
        data: [200, 220, 210, 250, 260, 240, 250],
        backgroundColor: 'rgba(255, 159, 64, 0.3)',
        borderColor: 'rgba(255, 159, 64, 1)',
      },
      {
        label: 'Costo Carretero',
        data: [50, 60, 60, 70, 80, 60, 80],
        backgroundColor: 'rgba(255, 205, 86, 0.3)',
        borderColor: 'rgba(255, 205, 86, 1)',
      }
    ]
  };

  const chartData = [
    {
      title: 'Asistencias',
      values: [95, 88, 92, 85, 90, 93, 87],
      color: 'success'
    },
    {
      title: 'Tiempo Asignación',
      values: [12, 15, 10, 18, 14, 16, 13],
      color: 'info'
    },
    {
      title: 'TiempoArribo',
      values: [25, 30, 22, 35, 28, 32, 26],
      color: 'warning'
    },
    {
      title: 'Cancelados con Costo',
      values: [5, 8, 3, 12, 7, 9, 6],
      color: 'danger'
    },
  ];

  return (
    <div className="tv-dashboard">
      <div className="container-fluid py-4">
        <div className="row">
          {/* Primer gráfico de área - Servicios */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow-lg" style={{ borderRadius: '16px' }}>
              <div className="card-header pb-3 pt-4 px-4" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', borderRadius: '16px 16px 0 0' }}>
                <div className="row align-items-center">
                  <div className="col-12">
                    <h5 className="mb-1">Servicios</h5>
                    <p className="text-sm mb-0">
                      {/* <i className="fa fa-check" aria-hidden="true" style={{ color: '#8B0000' }}></i>
                      <span className="font-weight-bold ms-1">Vista por día</span> */}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                <AreaChart 
                  data={serviciosAreaData}
                  title=""
                  height={300}
                />
              </div>
            </div>
          </div>

          {/* Segundo gráfico de área - Costos */}
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="card shadow-lg" style={{ borderRadius: '16px' }}>
              <div className="card-header pb-3 pt-4 px-4" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', borderRadius: '16px 16px 0 0' }}>
                <div className="row align-items-center">
                  <div className="col-12">
                    <h5 className="mb-1">Costos</h5>
                    <p className="text-sm mb-0">
                      {/* <i className="fa fa-check" aria-hidden="true" style={{ color: '#8B0000' }}></i>
                      <span className="font-weight-bold ms-1">Vista por día</span> */}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                <AreaChart 
                  data={costosAreaData}
                  title=""
                  height={300}
                />
              </div>
            </div>
          </div>

          {/* Gráficos de barras restantes */}
          {chartData.map((data, index) => (
            <div key={index} className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-lg" style={{ borderRadius: '16px' }}>
                <div className="card-header pb-3 pt-4 px-4" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', borderRadius: '16px 16px 0 0' }}>
                  <div className="row align-items-center">
                    <div className="col-12">
                      <h5 className="mb-1">{data.title}</h5>
                      <p className="text-sm mb-0">
                        {/* <i className="fa fa-check" aria-hidden="true" style={{ color: '#8B0000' }}></i>
                        <span className="font-weight-bold ms-1">Vista por día</span> */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4">
                  <BarChart 
                    data={{
                      labels: weeklyData.labels,
                      values: data.values
                    }}
                    title=""
                    height={300}
                    type="weekly"
                    color={data.color}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvDashboard;