import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthContext } from '../context/auth-context';

interface Props {
  requireAdmin?: boolean;
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<Props> = (props) => {
  const { requireAdmin, children } = props;
  const { user } = useAuthContext();

  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
