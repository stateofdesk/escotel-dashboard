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
    
    // agrupar por mes
    const monthlyData = this.groupByMonth(sortedData);
    
    return {
      labels: monthlyData.map(item => item.month),
      costos: monthlyData.map(item => item.costos),
      asistencias: monthlyData.map(item => item.asistencias),
      promedioAsignacion: monthlyData.map(item => item.promedioAsignacion),
      promedioArribo: monthlyData.map(item => item.promedioArribo),
      promedioConclusion: monthlyData.map(item => item.promedioConclusion),
      fechas: monthlyData.map(item => item.fecha),
      raw: monthlyData
    };
  }

  processDatosGeneralesData(data) {
    // ordenar por fecha
    const sortedData = data.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    
    // agrupar por mes
    const monthlyData = this.groupByMonth(sortedData, 'datosGenerales');
    
    return {
      labels: monthlyData.map(item => item.month),
      serviciosTotales: monthlyData.map(item => item.serviciosTotales),
      servicioLocal: monthlyData.map(item => item.servicioLocal),
      servicioCarretero: monthlyData.map(item => item.servicioCarretero),
      costoTotal: monthlyData.map(item => item.costoTotal),
      costoLocal: monthlyData.map(item => item.costoLocal),
      costoCarretero: monthlyData.map(item => item.costoCarretero),
      fechas: monthlyData.map(item => item.fecha),
      raw: monthlyData
    };
  }

  // agrupar datos por mes
  groupByMonth(data, type = 'servicios') {
    const monthlyGroups = {};
    
    data.forEach(item => {
      const date = new Date(item.fecha);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' });
      
      if (!monthlyGroups[monthKey]) {
        monthlyGroups[monthKey] = {
          month: monthLabel,
          fecha: monthKey,
          items: [],
          // servicios
          costos: 0,
          asistencias: 0,
          promedioAsignacion: 0,
          promedioArribo: 0,
          promedioConclusion: 0,
          // datos generales
          serviciosTotales: 0,
          servicioLocal: 0,
          servicioCarretero: 0,
          costoTotal: 0,
          costoLocal: 0,
          costoCarretero: 0
        };
      }
      
      monthlyGroups[monthKey].items.push(item);
    });
    
    // calcular promedios/sumas por mes
    Object.values(monthlyGroups).forEach(group => {
      const items = group.items;
      const count = items.length;
      
      if (type === 'servicios') {
        group.costos = items.reduce((sum, item) => sum + (item.costos || 0), 0) / count;
        group.asistencias = items.reduce((sum, item) => sum + (item.asistencias || 0), 0) / count;
        group.promedioAsignacion = items.reduce((sum, item) => sum + (item.promedioAsignacion || 0), 0) / count;
        group.promedioArribo = items.reduce((sum, item) => sum + (item.promedioArribo || 0), 0) / count;
        group.promedioConclusion = items.reduce((sum, item) => sum + (item.promedioConclusion || 0), 0) / count;
      } else if (type === 'datosGenerales') {
        group.serviciosTotales = items.reduce((sum, item) => sum + (item.serviciosTotales || 0), 0) / count;
        group.servicioLocal = items.reduce((sum, item) => sum + (item.servicioLocal || 0), 0) / count;
        group.servicioCarretero = items.reduce((sum, item) => sum + (item.servicioCarretero || 0), 0) / count;
        group.costoTotal = items.reduce((sum, item) => sum + (item.costoTotal || 0), 0) / count;
        group.costoLocal = items.reduce((sum, item) => sum + (item.costoLocal || 0), 0) / count;
        group.costoCarretero = items.reduce((sum, item) => sum + (item.costoCarretero || 0), 0) / count;
      }
    });
    
    return Object.values(monthlyGroups).sort((a, b) => a.fecha.localeCompare(b.fecha));
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