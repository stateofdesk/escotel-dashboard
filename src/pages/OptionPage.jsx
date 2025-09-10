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
    <div className="container-fluid py-4 px-3">
      <div className="card h-100 shadow-lg" style={{ borderRadius: '16px', minHeight: 'calc(100vh - 120px)' }}>
        <div className="card-header pb-3 pt-4 px-4" style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6', borderRadius: '16px 16px 0 0' }}>
          <div className="row">
            <div className="col-md-6 col-12">
              <h4 className="mb-1">{currentOption.title}</h4>
              <p className="text-sm mb-2 mb-md-0">
                <i className="fa fa-calendar text-info" aria-hidden="true"></i>
                <span className="font-weight-bold ms-1">Vista por semana</span>
              </p>
            </div>
            <div className="col-md-6 col-12 d-flex justify-content-md-end justify-content-start align-items-end">
              <select 
                className="form-select form-select-sm"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                style={{
                  fontSize: '0.875rem',
                  padding: '0.5rem 2.5rem 0.5rem 1rem',
                  borderRadius: '12px',
                  width: 'auto',
                  minWidth: '150px',
                  maxWidth: '220px',
                  border: '1px solid #dee2e6'
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
        <div className="card-body p-4" style={{ height: 'calc(100vh - 200px)', overflow: 'hidden' }}>
          <BarChart 
            data={{
              labels: monthlyData.labels,
              values: chartData.values
            }}
            title={chartData.title}
            height={window.innerHeight - 240}
            type="monthly"
            color={optionColor}
          />
        </div>
      </div>
    </div>
  );
};

export default OptionPage;