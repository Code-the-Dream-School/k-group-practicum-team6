import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
   const { user, loading } = useUser();

   if (loading) {
     return <div className="flex justify-center items-center min-h-screen"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>;
   }

   if (!user) {
     return <Navigate to="/" replace />;
   }

  return children;
};

export default ProtectedRoute;