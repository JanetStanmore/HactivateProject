import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface AdminCheckerProps {
  children: React.ReactNode;
}

const AdminChecker: React.FC<AdminCheckerProps> = ({ children }) => {
  const userId = window.sessionStorage.getItem('userId');
  const role = window.sessionStorage.getItem('role');
  const location = useLocation();

  if (!userId || role !== 'admin') {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default AdminChecker;