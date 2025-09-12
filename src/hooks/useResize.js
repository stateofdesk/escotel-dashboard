import { useState, useEffect } from 'react';

const useZoomResize = () => {
  const [zoomKey, setZoomKey] = useState(0);

  useEffect(() => {
    let zoomTimeout = null;

    // Solo detectar zoom mediante wheel + ctrl
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        // Es zoom, regenerar componentes
        if (zoomTimeout) {
          clearTimeout(zoomTimeout);
        }
        
        zoomTimeout = setTimeout(() => {
          setZoomKey(prev => prev + 1);
        }, 300);
      }
    };

    // Solo escuchar zoom, no resize normal
    window.addEventListener('wheel', handleWheel, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (zoomTimeout) {
        clearTimeout(zoomTimeout);
      }
    };
  }, []);

  return zoomKey;
};

export default useZoomResize;