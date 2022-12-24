import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { useContext } from 'react';
import { LoginPage } from '../pages/Login/LoginPage';

export const RutasPublicas = () =>
{
  const {auth} = useContext(AuthContext);

  if (auth && auth.isLogged)
  {
    return (<Navigate to='/web' />);
  }

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />

      <Route path="*" element={<Navigate to="login" replace/>} />
    </Routes>
  );
};
