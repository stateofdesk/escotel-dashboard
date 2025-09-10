import BarChart from '../components/BarChart';

const Dashboard = () => {
  const weeklyData = {
    labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  };

  const chartData = [
    {
      title: 'Análisis de Ventas',
      values: [65, 78, 82, 55, 90, 45, 88],
    },
    {
      title: 'Gestión de Inventario',
      values: [45, 62, 75, 88, 72, 95, 68],
    },
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
        {chartData.map((data, index) => {
          const colors = ['primary', 'success', 'info', 'warning', 'danger', 'dark'];
          const chartColor = colors[index % colors.length];
          
          return (
            <div key={index} className="col-lg-6 col-md-6 mb-4">
              <div className="card">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-12">
                      <h6>{data.title}</h6>
                      <p className="text-sm mb-0">
                        <i className="fa fa-check text-info" aria-hidden="true"></i>
                        <span className="font-weight-bold ms-1">Vista por día</span>
                      </p>
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
                      color={chartColor}
                    />
                  </div>
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