import BarChart from '../components/BarChart';

const Dashboard = () => {
  const weeklyData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  };

  const chartData = [
    {
      title: 'Opción 1 - Vista Semanal',
      values: [65, 78, 82, 55, 90, 45, 88],
    },
    {
      title: 'Opción 2 - Vista Semanal',
      values: [45, 62, 75, 88, 72, 95, 68],
    },
    {
      title: 'Opción 3 - Vista Semanal',
      values: [78, 85, 92, 67, 84, 76, 89],
    },
    {
      title: 'Opción 4 - Vista Semanal',
      values: [56, 73, 68, 91, 77, 83, 65],
    },
    {
      title: 'Opción 5 - Vista Semanal',
      values: [82, 69, 77, 85, 74, 92, 81],
    },
    {
      title: 'Opción 6 - Vista Semanal',
      values: [71, 88, 79, 94, 66, 87, 75],
    },
  ];

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="row mb-4">
            <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
              <div className="card">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-lg-6 col-7">
                      <h6>Dashboard ESCOTEL</h6>
                      <p className="text-sm mb-0">
                        <i className="fa fa-check text-info" aria-hidden="true"></i>
                        <span className="font-weight-bold ms-1">Vista semanal</span> de todas las opciones
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive">
                    <p className="text-xs text-secondary mb-3 px-3">
                      Resumen de todas las opciones con datos de la semana actual
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100">
                <div className="card-header pb-0">
                  <h6>Información</h6>
                  <p className="text-sm">
                    <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                    <span className="font-weight-bold">+24%</span> esta semana
                  </p>
                </div>
                <div className="card-body p-3">
                  <div className="timeline timeline-one-side">
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="material-symbols-rounded text-success text-gradient">notifications</i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">6 Opciones Activas</h6>
                        <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">Todas funcionando correctamente</p>
                      </div>
                    </div>
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="material-symbols-rounded text-warning text-gradient">code</i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">Sistema ESCOTEL</h6>
                        <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">Dashboard integrado</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {chartData.map((data, index) => (
          <div key={index} className="col-lg-6 col-md-6 mb-4">
            <div className="card">
              <div className="card-header pb-0">
                <div className="row">
                  <div className="col-lg-6 col-7">
                    <h6>{data.title}</h6>
                    <p className="text-sm mb-0">
                      <i className="fa fa-check text-info" aria-hidden="true"></i>
                      <span className="font-weight-bold ms-1">Datos semanales</span>
                    </p>
                  </div>
                  <div className="col-lg-6 col-5 my-auto text-end">
                    <div className="dropdown float-lg-end pe-4">
                      <a className="cursor-pointer" id={`dropdownTable${index}`} data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="px-3">
                  <BarChart 
                    data={{
                      labels: weeklyData.labels,
                      values: data.values
                    }}
                    title=""
                    height={250}
                    type="weekly"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;