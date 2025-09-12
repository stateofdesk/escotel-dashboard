import { useState, useEffect } from 'react';

const useResize = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    key: 0
  });

  useEffect(() => {
    let timeoutId = null;
    
    const handleResize = () => {
      // Debounce para evitar demasiadas actualizaciones
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        setDimensions(prev => ({
          width: window.innerWidth,
          height: window.innerHeight,
          key: prev.key + 1
        }));
      }, 150); // 150ms de delay
    };

    // Listener para cambios de tamaño de ventana
    window.addEventListener('resize', handleResize);
    
    // Listener para cambios de orientación (móvil)
    window.addEventListener('orientationchange', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return dimensions;
};

export default useResize;