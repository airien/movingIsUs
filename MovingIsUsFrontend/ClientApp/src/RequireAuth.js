import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from "./context/auth.context";

export function RequireAuth({ children }) {
    const { user } = useAuth();
    const location = useLocation();
  
    return user !== null
      ? children
      : <Navigate to="/login"  replace state={{ path: location.pathname }}  />;
  }