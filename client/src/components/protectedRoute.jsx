import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Verifica si el token está en localStorage
  const location = useLocation(); // Obtiene la ubicación actual

  if (!token) {
    // Si no hay token, redirige a la página de inicio de sesión
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Si hay token, renderiza los hijos
  return children;
};

export default ProtectedRoute;