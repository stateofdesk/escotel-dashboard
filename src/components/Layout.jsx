import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`g-sidenav-show bg-gray-100 ${isAuthenticated ? '' : 'd-flex align-items-center min-vh-100'}`}>
      {isAuthenticated && isMobile && (
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 1001,
            background: 'linear-gradient(195deg, #42424a, #191919)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '3rem',
            height: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer'
          }}
        >
          <i className="material-symbols-rounded">menu</i>
        </button>
      )}
      
      <Sidebar 
        isAuthenticated={isAuthenticated} 
        onSignOut={handleSignOut}
        isMobile={isMobile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <main className={`main-content position-relative max-height-vh-100 h-100 border-radius-lg ${isAuthenticated && !isMobile ? 'ps-2' : ''}`} style={isAuthenticated && !isMobile ? { marginLeft: '17rem' } : {}}>
        <div className="container-fluid">
          <Outlet context={{ isAuthenticated, handleSignIn }} />
        </div>
      </main>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="position-fixed w-100 h-100 bg-dark opacity-50" 
          style={{ top: 0, left: 0, zIndex: 999 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;