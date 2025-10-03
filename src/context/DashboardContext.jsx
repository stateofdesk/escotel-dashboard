import React, { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react';
import ApiService from '../services/apiService';

const DashboardContext = createContext(undefined);

// provider
export function DashboardProvider({ children }) {
  const [servicios, setServicios] = useState(null);
  const [datosGenerales, setDatosGenerales] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [serviciosData, datosGeneralesData] = await Promise.all([
        ApiService.fetchServicios(),
        ApiService.fetchDatosGenerales()
      ]);

      setServicios(serviciosData);
      setDatosGenerales(datosGeneralesData);
    } catch (err) {
      setError(err);
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  const value = useMemo(
    () => ({
      servicios,
      datosGenerales,
      loading,
      error,
      refetch
    }),
    [servicios, datosGenerales, loading, error, refetch]
  );

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);

  if (context === undefined) {
    throw new Error('useDashboard debe usarse dentro de DashboardProvider');
  }

  return context;
}