import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface SecurityCheckerProps {
  children: React.ReactNode;
}

const SecurityChecker: React.FC<SecurityCheckerProps> = ({ children }) => {
  const userId = window.sessionStorage.getItem('userId');
  const role = window.sessionStorage.getItem('role');
  const location = useLocation();

  const isGuardOrAdmin = role === 'guard' || role === 'admin';

  if (!userId || !isGuardOrAdmin) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default SecurityChecker;