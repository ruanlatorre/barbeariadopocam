import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SubscriptionPlans from './pages/SubscriptionPlans';
import Schedule from './pages/Schedule';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/plans" element={<ProtectedRoute><SubscriptionPlans /></ProtectedRoute>} />
        <Route path="/schedule" element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
