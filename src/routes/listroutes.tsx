import React from 'react'; // Adicione esta linha
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home/home';
import AdminPanel from '../pages/adminPanel/AdminPanel';
import Login from '../pages/login/login';

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
    element: <AdminPanel/>,
  },
  {
    path: '*',
    element: <h1>Not Found</h1>,
  },
]);

export default ListRoutes;
