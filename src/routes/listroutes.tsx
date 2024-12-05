import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '../pages/home/home';
import AdminPanel from '../pages/adminPanel/AdminPanel';
import Login from '../pages/login/login';
// @ts-ignore
import { auth } from "../config/firebaseConfig"; // Caminho para sua configuração do Firebase
import { useState, useEffect } from 'react';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const ListRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <AdminPanel />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: <h1>Not Found</h1>,
  },
]);

export default ListRoutes;
