const API_BASE_URL = 'https://dev-sigsa.backend.escotel.mx/api/EstadisticasServicios';

class ApiService {
  async fetchServicios(fechaInicio = null) {
    try {
      // usar ayer si no hay fecha
      if (!fechaInicio) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        fechaInicio = yesterday.toISOString().split('T')[0];
      }
      
      const response = await fetch(`${API_BASE_URL}/Servicios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fechaInicio }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.processServiciosData(data);
    } catch (error) {
      console.error('Error fetching Servicios data:', error);
      throw error;
    }
  }

  async fetchDatosGenerales(fechaInicio = null) {
    try {
      // usar ayer si no hay fecha
      if (!fechaInicio) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        fechaInicio = yesterday.toISOString().split('T')[0];
      }
      
      const response = await fetch(`${API_BASE_URL}/DatosGenerales`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fechaInicio }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return this.processDatosGeneralesData(data);
    } catch (error) {
      console.error('Error fetching DatosGenerales data:', error);
      throw error;
    }
  }

  processServiciosData(data) {
    // ordenar por fecha
    const sortedData = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
    // últimos 10 días
    const recentData = sortedData.slice(-10);
    
    return {
      labels: recentData.map(item => {
        const date = new Date(item.fecha);
        return date.toLocaleDateString('es-ES', { 
          month: 'short', 
          day: 'numeric' 
        });
      }),
      costos: recentData.map(item => item.costos || 0),
      asistencias: recentData.map(item => item.asistencias || 0),
      promedioAsignacion: recentData.map(item => item.promedioAsignacion || 0),
      promedioArribo: recentData.map(item => item.promedioArribo || 0),
      promedioConclusion: recentData.map(item => item.promedioConclusion || 0),
      fechas: recentData.map(item => item.fecha),
      raw: recentData
    };
  }

  processDatosGeneralesData(data) {
    // ordenar por fecha
    const sortedData = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
    // últimos 10 días
    const recentData = sortedData.slice(-10);
    
    return {
      labels: recentData.map(item => {
        const date = new Date(item.fecha);
        return date.toLocaleDateString('es-ES', { 
          month: 'short', 
          day: 'numeric' 
        });
      }),
      serviciosTotales: recentData.map(item => item.serviciosTotales || 0),
      servicioLocal: recentData.map(item => item.servicioLocal || 0),
      servicioCarretero: recentData.map(item => item.servicioCarretero || 0),
      costoTotal: recentData.map(item => item.costoTotal || 0),
      costoLocal: recentData.map(item => item.costoLocal || 0),
      costoCarretero: recentData.map(item => item.costoCarretero || 0),
      fechas: recentData.map(item => item.fecha),
      raw: recentData
    };
  }

  // métricas para analytics
  calculateMetrics(data, type = 'servicios') {
    if (!data || !data.raw || data.raw.length === 0) return {};

    const rawData = data.raw;
    
    if (type === 'servicios') {
      const costos = rawData.map(item => item.costos || 0).filter(cost => cost > 0);
      const asistencias = rawData.map(item => item.asistencias || 0);
      const tiemposAsignacion = rawData.map(item => item.promedioAsignacion || 0);
      const tiemposArribo = rawData.map(item => item.promedioArribo || 0);
      const tiemposConclusion = rawData.map(item => item.promedioConclusion || 0);
      
      return {
        totalCostos: costos.reduce((sum, cost) => sum + cost, 0),
        totalAsistencias: asistencias.reduce((sum, assist) => sum + assist, 0),
        promedioCostos: costos.length > 0 ? costos.reduce((sum, cost) => sum + cost, 0) / costos.length : 0,
        promedioAsistencias: asistencias.length > 0 ? asistencias.reduce((sum, assist) => sum + assist, 0) / asistencias.length : 0,
        promedioAsignacion: tiemposAsignacion.length > 0 ? tiemposAsignacion.reduce((sum, tiempo) => sum + tiempo, 0) / tiemposAsignacion.length : 0,
        promedioArribo: tiemposArribo.length > 0 ? tiemposArribo.reduce((sum, tiempo) => sum + tiempo, 0) / tiemposArribo.length : 0,
        promedioConclusion: tiemposConclusion.length > 0 ? tiemposConclusion.reduce((sum, tiempo) => sum + tiempo, 0) / tiemposConclusion.length : 0,
        maxCostos: Math.max(...costos),
        minCostos: Math.min(...costos.filter(c => c > 0)),
        maxAsistencias: Math.max(...asistencias),
        diasConActividad: costos.filter(c => c > 0).length
      };
    } else if (type === 'datosGenerales') {
      const serviciosTotales = rawData.map(item => item.serviciosTotales || 0);
      const serviciosLocales = rawData.map(item => item.servicioLocal || 0);
      const serviciosCarretero = rawData.map(item => item.servicioCarretero || 0);
      const costosTotal = rawData.map(item => item.costoTotal || 0);
      const costosLocal = rawData.map(item => item.costoLocal || 0);
      const costosCarretero = rawData.map(item => item.costoCarretero || 0);
      
      return {
        totalServicios: serviciosTotales.reduce((sum, serv) => sum + serv, 0),
        totalLocal: serviciosLocales.reduce((sum, serv) => sum + serv, 0),
        totalCarretero: serviciosCarretero.reduce((sum, serv) => sum + serv, 0),
        totalCosto: costosTotal.reduce((sum, cost) => sum + cost, 0),
        costoLocal: costosLocal.reduce((sum, cost) => sum + cost, 0),
        costoCarretero: costosCarretero.reduce((sum, cost) => sum + cost, 0),
        promedioServicios: serviciosTotales.length > 0 ? serviciosTotales.reduce((sum, serv) => sum + serv, 0) / serviciosTotales.length : 0,
        porcentajeLocal: serviciosLocales.reduce((sum, serv) => sum + serv, 0) / serviciosTotales.reduce((sum, serv) => sum + serv, 0) * 100 || 0,
        porcentajeCarretero: serviciosCarretero.reduce((sum, serv) => sum + serv, 0) / serviciosTotales.reduce((sum, serv) => sum + serv, 0) * 100 || 0
      };
    }
  }
}

export default new ApiService();