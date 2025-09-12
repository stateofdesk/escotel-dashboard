const ChartCard = ({ title, loading, error, children, spinnerColor = "primary" }) => {
  const cardStyle = { borderRadius: '16px' };
  const headerStyle = { 
    backgroundColor: '#f8f9fa', 
    borderBottom: '1px solid #dee2e6', 
    borderRadius: '16px 16px 0 0', 
    height: '60px' 
  };
  const bodyStyle = { padding: '0 1rem 1rem 1rem', flex: 1 };

  if (loading) {
    return (
      <div className="card shadow-lg h-100" style={cardStyle}>
        <div className="card-header d-flex justify-content-center align-items-center" style={headerStyle}>
          <h5 className="mb-0 text-center">{title}</h5>
        </div>
        <div className="card-body d-flex justify-content-center align-items-center" style={bodyStyle}>
          <div className={`spinner-border text-${spinnerColor}`} role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card shadow-lg h-100" style={cardStyle}>
        <div className="card-header d-flex justify-content-center align-items-center" style={headerStyle}>
          <h5 className="mb-0 text-center">{title}</h5>
        </div>
        <div className="card-body d-flex justify-content-center align-items-center" style={bodyStyle}>
          <div className="text-center">
            <i className="fa fa-wifi text-danger mb-2" style={{ fontSize: '2rem' }}></i>
            <p className="text-muted">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-lg h-100" style={cardStyle}>
      <div className="card-header d-flex justify-content-center align-items-center" style={headerStyle}>
        <h5 className="mb-0 text-center">{title}</h5>
      </div>
      <div className="card-body d-flex flex-column" style={bodyStyle}>
        <div style={{ flex: 1, width: '100%', marginTop: '-25px', minHeight: '200px' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ChartCard;