// frontend/src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hasPermission } from '../utils/permissions';

const ProtectedRoute = ({ children, permission }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (permission && !hasPermission(user, permission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-5xl mb-4">🚫</div>
          <h2 className="font-heading font-bold text-xl text-gray-800 dark:text-white mb-2">Access Denied</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">You don&apos;t have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
