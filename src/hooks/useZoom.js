import { useState, useEffect } from 'react';

const useZoom = () => {
  const [zoomKey, setZoomKey] = useState(0);

  useEffect(() => {
    let timeout = null;
    
    const handleWheel = (e) => {
      if (e.ctrlKey) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => setZoomKey(prev => prev + 1), 300);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return zoomKey;
};

export default useZoom;