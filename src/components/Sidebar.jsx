import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isAuthenticated, onSignOut, isMobile, isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', name: 'Dashboard', icon: 'dashboard' },
    { path: '/opcion1', name: 'Opción 1', icon: 'point_of_sale' },
    { path: '/opcion2', name: 'Opción 2', icon: 'inventory' },
    { path: '/opcion3', name: 'Opción 3', icon: 'groups' },
    { path: '/opcion4', name: 'Opción 4', icon: 'account_balance' },
    { path: '/opcion5', name: 'Opción 5', icon: 'settings' },
    { path: '/opcion6', name: 'Opción 6', icon: 'campaign' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const sidebarClasses = `sidenav navbar navbar-vertical navbar-expand-xs border-radius-lg bg-white ${
    isMobile 
      ? `position-fixed h-100 ${isOpen ? 'show' : ''}` 
      : 'fixed-start ms-2 my-2'
  }`;

  const sidebarStyle = isMobile ? {
    zIndex: 1000,
    top: 0,
    left: 0,
    width: '280px',
    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s ease'
  } : {};

  return (
    <aside className={sidebarClasses} style={{...sidebarStyle, overflow: 'hidden'}} id="sidenav-main">
      <div className="sidenav-header">
        {isMobile && (
          <i 
            className="fas fa-times p-3 cursor-pointer text-dark opacity-5 position-absolute end-0 top-0" 
            aria-hidden="true" 
            onClick={onClose}
          />
        )}
        <Link className="navbar-brand px-4 py-3 m-0" to="/dashboard" onClick={handleLinkClick}>
          <div className="d-flex align-items-center">
            <div className="bg-gradient-dark rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
              <i className="material-symbols-rounded text-white" style={{fontSize: '18px'}}>business</i>
            </div>
            <span className="text-dark font-weight-bold">ESCOTEL</span>
          </div>
        </Link>
      </div>
      <hr className="horizontal dark mt-0 mb-2" />
      <div className="collapse navbar-collapse w-auto show" id="sidenav-collapse-main" style={{overflow: 'hidden'}}>
        <ul className="navbar-nav" style={{overflow: 'hidden'}}>
          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link 
                className={`nav-link ${isActive(item.path) ? 'active bg-gradient-dark text-white' : 'text-dark'}`}
                to={item.path}
                onClick={handleLinkClick}
              >
                <i className="material-symbols-rounded opacity-5">{item.icon}</i>
                <span className="nav-link-text ms-1">{item.name}</span>
              </Link>
            </li>
          ))}
          <li className="nav-item mt-3">
            <h6 className="ps-4 ms-2 text-uppercase text-xs text-dark font-weight-bolder opacity-5">Cuenta</h6>
          </li>
          <li className="nav-item">
            <button 
              className="nav-link text-dark w-100 text-start border-0 bg-transparent"
              onClick={onSignOut}
              style={{ cursor: 'pointer' }}
            >
              <i className="material-symbols-rounded opacity-5">logout</i>
              <span className="nav-link-text ms-1">Cerrar Sesión</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;