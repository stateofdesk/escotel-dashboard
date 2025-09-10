import { useState } from 'react';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div className="bg-gray-200">
      <div className="container position-sticky z-index-sticky top-0">
        <div className="row">
          <div className="col-12">
            <nav className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
              <div className="container-fluid ps-2 pe-0">
                <a className="navbar-brand font-weight-bolder ms-lg-0 ms-3" href="#">
                  ESCOTEL Dashboard
                </a>
                <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon mt-2">
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </span>
                </button>
                <div className="collapse navbar-collapse" id="navigation">
                  <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                      <a className="nav-link d-flex align-items-center me-2 active" aria-current="page" href="#">
                        <i className="fa fa-chart-pie opacity-6 text-dark me-1"></i>
                        Dashboard
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link me-2" href="#">
                        <i className="fa fa-user opacity-6 text-dark me-1"></i>
                        Perfil
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link me-2" href="#">
                        <i className="fas fa-user-circle opacity-6 text-dark me-1"></i>
                        Registro
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link me-2" href="#">
                        <i className="fas fa-key opacity-6 text-dark me-1"></i>
                        Iniciar Sesión
                      </a>
                    </li>
                  </ul>
                  <ul className="navbar-nav d-lg-flex d-none">
                    <li className="nav-item d-flex align-items-center">
                      <a className="btn btn-outline-primary btn-sm mb-0 me-2" href="#">Panel Admin</a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="btn btn-sm mb-0 me-1 bg-gradient-dark">ESCOTEL</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <main className="main-content mt-0">
        <div className="page-header align-items-start min-vh-100" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')"
        }}>
          <span className="mask bg-gradient-dark opacity-6"></span>
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-dark shadow-dark border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Iniciar Sesión</h4>
                      <div className="row mt-3">
                        <div className="col-2 text-center ms-auto">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i className="fa fa-facebook text-white text-lg"></i>
                          </a>
                        </div>
                        <div className="col-2 text-center px-1">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i className="fa fa-github text-white text-lg"></i>
                          </a>
                        </div>
                        <div className="col-2 text-center me-auto">
                          <a className="btn btn-link px-3" href="javascript:;">
                            <i className="fa fa-google text-white text-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form role="form" className="text-start" onSubmit={handleSubmit}>
                      <div className="input-group input-group-outline my-3">
                        <label className="form-label">Email</label>
                        <input 
                          type="email" 
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <label className="form-label">Password</label>
                        <input 
                          type="password" 
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-check form-switch d-flex align-items-center mb-3">
                        <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
                        <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Recordarme</label>
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn bg-gradient-dark w-100 my-4 mb-2">
                          Iniciar Sesión
                        </button>
                      </div>
                      <p className="mt-4 text-sm text-center">
                        ¿No tienes una cuenta?{' '}
                        <a href="#" className="text-primary text-gradient font-weight-bold">Registrarse</a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer position-absolute bottom-2 py-2 w-100">
            <div className="container">
              <div className="row align-items-center justify-content-lg-between">
                <div className="col-12 col-md-6 my-auto">
                  <div className="copyright text-center text-sm text-white text-lg-start">
                    © 2024, ESCOTEL Sistema de Gestión Empresarial.
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                    <li className="nav-item">
                      <a href="#" className="nav-link text-white">ESCOTEL</a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link text-white">Acerca de</a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link text-white">Blog</a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link pe-0 text-white">Soporte</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default SignIn;