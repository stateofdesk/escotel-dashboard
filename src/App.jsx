import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TvDashboard from './pages/TvDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TvDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;