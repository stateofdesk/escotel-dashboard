import { useState } from 'react';

const SignIn = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(195deg, #42424a, #191919)',
      fontFamily: 'Inter, sans-serif',
      padding: '1rem',
      boxSizing: 'border-box'
    }}>
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(195deg, #42424a, #191919)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'white',
            fontSize: '20px'
          }}>
            <i className="material-symbols-rounded">business</i>
          </div>
          <h2 style={{
            margin: '0 0 0.5rem',
            color: '#344767',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            ESCOTEL
          </h2>
          <p style={{
            margin: 0,
            color: '#666',
            fontSize: '14px'
          }}>
            Sistema de Gestión Empresarial
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#42424a'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#333',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#42424a'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1.5rem',
            gap: '8px'
          }}>
            <input
              type="checkbox"
              id="remember"
              style={{ 
                width: '16px', 
                height: '16px',
                accentColor: '#42424a'
              }}
            />
            <label htmlFor="remember" style={{
              fontSize: '14px',
              color: '#666',
              lineHeight: '1'
            }}>
              Recordarme
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              background: 'linear-gradient(195deg, #42424a, #191919)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              marginBottom: '1rem'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Iniciar Sesión
          </button>

        </form>

        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid #eee',
          fontSize: '12px',
          color: '#999'
        }}>
          © 2024 ESCOTEL. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
};

export default SignIn;