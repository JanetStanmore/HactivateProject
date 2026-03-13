import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface AuthCheckerProps {
  children: React.ReactNode;
}

const AuthChecker: React.FC<AuthCheckerProps> = ({ children }) => {
  const userId = window.sessionStorage.getItem('userId');
  const location = useLocation();

  if (!userId) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default AuthChecker;