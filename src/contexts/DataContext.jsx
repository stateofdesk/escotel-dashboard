import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [cachedData, setCachedData] = useState({
    servicios: null,
    datosGenerales: null,
    asistencias: null,
    tiempoAsignacion: null,
    tiempoArribo: null,
    cancelados: null
  });

  const updateCache = (key, data) => {
    setCachedData(prev => ({
      ...prev,
      [key]: data
    }));
  };

  const getCache = (key) => {
    return cachedData[key];
  };

  return (
    <DataContext.Provider value={{
      updateCache,
      getCache,
      cachedData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;