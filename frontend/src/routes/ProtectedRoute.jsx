import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const token = authService.getToken();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;