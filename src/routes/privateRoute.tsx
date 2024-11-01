import React from 'react';
import { Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
// @ts-ignore
import { auth } from "../config/firebaseConfig"; // Ajuste o caminho se necessário
import { User } from 'firebase/auth'; // Importando o tipo User da biblioteca

// Definindo a interface para os props do PrivateRoute
interface PrivateRouteProps {
  component: React.ComponentType<any>;
  [key: string]: any; // Para aceitar outros props
}

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return unsubscribe; // Limpeza do listener ao desmontar o componente
  }, []);

  if (loading) return <div>Loading...</div>; // Mostra carregando enquanto verifica a autenticação

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />}
    />
  );
}

export default PrivateRoute;
