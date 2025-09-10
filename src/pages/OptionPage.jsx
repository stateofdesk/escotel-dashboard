import BarChart from '../components/BarChart';

const OptionPage = ({ optionNumber }) => {
  const monthlyData = {
    labels: [
      'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 
      'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10', 'Sem 11', 'Sem 12'
    ],
  };

  const generateRandomData = () => {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 20);
  };

  const chartData = {
    title: `Opción ${optionNumber} - Vista Mensual`,
    values: generateRandomData(),
  };

  const optionDescriptions = {
    1: {
      title: 'Análisis de Ventas',
      description: 'Este módulo permite analizar las tendencias de ventas a lo largo del tiempo, identificando patrones y oportunidades de crecimiento.',
      features: ['Análisis de tendencias', 'Comparación temporal', 'Predicciones básicas', 'Reportes exportables']
    },
    2: {
      title: 'Gestión de Inventario',
      description: 'Control completo del inventario con seguimiento en tiempo real, alertas de stock bajo y optimización de almacenamiento.',
      features: ['Control de stock', 'Alertas automáticas', 'Rotación de productos', 'Análisis de demanda']
    },
    3: {
      title: 'Análisis de Clientes',
      description: 'Segmentación y análisis del comportamiento de clientes para mejorar la experiencia y aumentar la retención.',
      features: ['Segmentación de clientes', 'Análisis de comportamiento', 'Métricas de satisfacción', 'Programas de fidelización']
    },
    4: {
      title: 'Control Financiero',
      description: 'Monitoreo de métricas financieras clave, flujo de caja y análisis de rentabilidad por producto o servicio.',
      features: ['Flujo de caja', 'Análisis de rentabilidad', 'Presupuestos', 'Indicadores KPI']
    },
    5: {
      title: 'Productividad Operativa',
      description: 'Optimización de procesos operativos mediante el seguimiento de eficiencia y identificación de cuellos de botella.',
      features: ['Eficiencia operativa', 'Análisis de procesos', 'Optimización de recursos', 'Mejora continua']
    },
    6: {
      title: 'Marketing Digital',
      description: 'Análisis del rendimiento de campañas digitales, ROI de marketing y métricas de conversión en múltiples canales.',
      features: ['ROI de campañas', 'Análisis de conversión', 'Métricas de engagement', 'Optimización de canales']
    }
  };

  const currentOption = optionDescriptions[optionNumber] || optionDescriptions[1];

  return (
    <div className="container-fluid py-4">
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
              <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                <h6 className="text-white text-capitalize ps-3">{currentOption.title}</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="px-4">
                <p className="text-sm text-secondary mb-4">
                  {currentOption.description}
                </p>
                
                <div className="row mb-4">
                  <div className="col-lg-8">
                    <div className="card">
                      <div className="card-header pb-0">
                        <h6>Gráfico Mensual</h6>
                        <p className="text-sm mb-0">
                          <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                          <span className="font-weight-bold ms-1">Datos del mes actual</span>
                        </p>
                      </div>
                      <div className="card-body">
                        <BarChart 
                          data={{
                            labels: monthlyData.labels,
                            values: chartData.values
                          }}
                          title={chartData.title}
                          height={400}
                          type="monthly"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-4">
                    <div className="card h-100">
                      <div className="card-header pb-0">
                        <h6>Características</h6>
                      </div>
                      <div className="card-body">
                        <ul className="list-group">
                          {currentOption.features.map((feature, index) => (
                            <li key={index} className="list-group-item border-0 d-flex p-4 mb-2 bg-gray-100 border-radius-lg">
                              <div className="d-flex flex-column">
                                <h6 className="mb-1 text-dark text-sm">{feature}</h6>
                                <span className="text-xs">Función disponible</span>
                              </div>
                              <div className="ms-auto text-end">
                                <i className="material-symbols-rounded text-success">check_circle</i>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="card">
                      <div className="card-header mx-4 p-3 text-center">
                        <div className="icon icon-shape icon-lg bg-gradient-dark shadow text-center border-radius-lg">
                          <i className="material-symbols-rounded opacity-10">trending_up</i>
                        </div>
                      </div>
                      <div className="card-body pt-0 p-3 text-center">
                        <h6 className="text-center mb-0">Crecimiento</h6>
                        <span className="text-xs">+24%</span>
                        <hr className="horizontal dark my-3" />
                        <h5 className="mb-0">+12.5%</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="card">
                      <div className="card-header mx-4 p-3 text-center">
                        <div className="icon icon-shape icon-lg bg-gradient-dark shadow text-center border-radius-lg">
                          <i className="material-symbols-rounded opacity-10">analytics</i>
                        </div>
                      </div>
                      <div className="card-body pt-0 p-3 text-center">
                        <h6 className="text-center mb-0">Eficiencia</h6>
                        <span className="text-xs">Promedio</span>
                        <hr className="horizontal dark my-3" />
                        <h5 className="mb-0">87.3%</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="card">
                      <div className="card-header mx-4 p-3 text-center">
                        <div className="icon icon-shape icon-lg bg-gradient-dark shadow text-center border-radius-lg">
                          <i className="material-symbols-rounded opacity-10">assessment</i>
                        </div>
                      </div>
                      <div className="card-body pt-0 p-3 text-center">
                        <h6 className="text-center mb-0">Rendimiento</h6>
                        <span className="text-xs">Objetivo</span>
                        <hr className="horizontal dark my-3" />
                        <h5 className="mb-0">94.2%</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionPage;