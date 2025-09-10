import BarChart from '../components/BarChart';
import { useState } from 'react';

const OptionPage = ({ optionNumber }) => {
  const colors = ['primary', 'success', 'info', 'warning', 'danger', 'dark'];
  const optionColor = colors[(optionNumber - 1) % colors.length];
  
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const monthlyData = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
  };

  const generateRandomData = (month) => {
    // Usar el mes como seed para datos consistentes
    const seed = month + optionNumber;
    return Array.from({ length: 4 }, (_, i) => {
      const base = (seed * 7 + i * 13) % 80;
      return base + 20;
    });
  };

  const chartData = {
    title: `${months[selectedMonth]} 2025`,
    values: generateRandomData(selectedMonth),
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
                <div className="row mb-4">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header pb-0">
                        <div className="row">
                          <div className="col-md-8">
                            <h6>Gráfico Mensual</h6>
                            <p className="text-sm mb-0">
                              <i className="fa fa-calendar text-info" aria-hidden="true"></i>
                              <span className="font-weight-bold ms-1">Vista por semana</span>
                            </p>
                          </div>
                          <div className="col-md-4">
                            <select 
                              className="form-select form-select-sm"
                              value={selectedMonth}
                              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                              style={{
                                fontSize: '0.875rem',
                                padding: '0.375rem 0.75rem'
                              }}
                            >
                              {months.map((month, index) => (
                                <option key={index} value={index}>
                                  {month}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
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
                          color={optionColor}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Métricas comentadas temporalmente
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
                */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionPage;