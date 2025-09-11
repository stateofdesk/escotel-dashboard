import BarChart from '../components/BarChart';
import ServiciosChart from '../components/ServiciosChart';
import DatosGeneralesChart from '../components/DatosGeneralesChart';

const Dashboard = () => {
  const weeklyData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  };

  // Mock data para gráficos 3-6 (mantener como está)
  const chartData = [
    {
      title: 'Análisis de Clientes',
      values: [78, 85, 92, 67, 84, 76, 89],
    },
    {
      title: 'Control Financiero',
      values: [56, 73, 68, 91, 77, 83, 65],
    },
    {
      title: 'Productividad Operativa',
      values: [82, 69, 77, 85, 74, 92, 81],
    },
    {
      title: 'Marketing Digital',
      values: [71, 88, 79, 94, 66, 87, 75],
    },
  ];

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Gráfico 1: Servicios API (Real Data) */}
        <div className="col-lg-6 col-md-6 mb-4">
          <ServiciosChart />
        </div>

        {/* Gráfico 2: Datos Generales API (Real Data) */}
        <div className="col-lg-6 col-md-6 mb-4">
          <DatosGeneralesChart />
        </div>

        {/* Gráficos 3-6: Mock Data (como estaba) */}
        {chartData.map((data, index) => {
          const colors = ['info', 'warning', 'danger', 'dark'];
          const chartColor = colors[index % colors.length];
          
          return (
            <div key={index} className="col-lg-6 col-md-6 mb-4">
              <div className="card shadow-lg" style={{ borderRadius: '16px' }}>
                <div className="card-header pb-3 pt-4 px-4" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', borderRadius: '16px 16px 0 0' }}>
                  <div className="row align-items-center">
                    <div className="col-12">
                      <h5 className="mb-1">{data.title}</h5>
                      <p className="text-sm mb-0">
                        <i className="fa fa-check" aria-hidden="true" style={{ color: '#8B0000' }}></i>
                        <span className="font-weight-bold ms-1">Vista por día (Mock)</span>
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
                    height={250}
                    type="weekly"
                    color={chartColor}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;