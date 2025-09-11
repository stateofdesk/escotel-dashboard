import { BrowserRouter as Router, Routes, Route, Navigate, useOutletContext } from 'react-router-dom';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import TvDashboard from './pages/TvDashboard';
import Opcion1 from './pages/options/Opcion1';
import Opcion2 from './pages/options/Opcion2';
import Opcion3 from './pages/options/Opcion3';
import Opcion4 from './pages/options/Opcion4';
import Opcion5 from './pages/options/Opcion5';
import Opcion6 from './pages/options/Opcion6';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useOutletContext();
  return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useOutletContext();
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

const SignInWrapper = () => {
  const { handleSignIn } = useOutletContext();
  return <SignIn onSignIn={handleSignIn} />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/signin" replace />} />
          <Route 
            path="signin" 
            element={
              <AuthRoute>
                <SignInWrapper />
              </AuthRoute>
            } 
          />
          <Route 
            path="dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="opcion1" 
            element={
              <ProtectedRoute>
                <Opcion1 />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="opcion2" 
            element={
              <ProtectedRoute>
                <Opcion2 />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="opcion3" 
            element={
              <ProtectedRoute>
                <Opcion3 />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="opcion4" 
            element={
              <ProtectedRoute>
                <Opcion4 />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="opcion5" 
            element={
              <ProtectedRoute>
                <Opcion5 />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="opcion6" 
            element={
              <ProtectedRoute>
                <Opcion6 />
              </ProtectedRoute>
            } 
          />
        </Route>
        <Route path="/tv" element={<TvDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;