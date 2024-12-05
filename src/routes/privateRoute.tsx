import React, { useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
// @ts-ignore
import { auth } from "../config/firebaseConfig"; // Ajuste o caminho se necessário
import { User } from 'firebase/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div>Verificando autenticação...</div>;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
