import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isLoggedInContext } from '../../contexts/CurrentUserContext';

function PrivateRoutes() {
  const isLoggedIn = useContext(isLoggedInContext);
  return isLoggedIn ? <Outlet /> : <Navigate to={'/'} />;
}

export default PrivateRoutes;
