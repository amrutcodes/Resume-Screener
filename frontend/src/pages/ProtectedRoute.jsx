import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ role, children }) => {
  const user = JSON.parse(localStorage.getItem('USER'));

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role mismatch
  if (user.role !== role) {
    return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/dashboard'} replace />;
  }

  // Authorized
  return children;
};

export default ProtectedRoute;
