import { useState, useEffect } from 'react';

const useChartData = (apiCall, dataTransformer) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const apiResponse = await apiCall();
        const chartData = dataTransformer(apiResponse);
        
        setData(chartData);
      } catch (err) {
        setError(err.message || 'Error al cargar datos');
        console.error('Chart data error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // refresh cada 5 minutos
    const interval = setInterval(fetchData, 300000);
    return () => clearInterval(interval);
  }, [apiCall, dataTransformer]);

  return { data, loading, error };
};

export default useChartData;