import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './pages/Dashboard';
import DashboardOverview from './pages/DashboardOverview';
import Goals from './pages/Goals';
import Todos from './pages/Todos';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="goals" element={<Goals />} />
            <Route path="todos" element={<Todos />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
