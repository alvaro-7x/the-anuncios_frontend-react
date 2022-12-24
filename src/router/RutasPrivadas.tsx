import { Fragment, useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AnunciosPage } from '../pages/Anuncios/AnunciosPage';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { AuthTypes } from '../types/AuthTypes';
import { Header } from '../components/Header/Header';
import { ProcesandoDatos } from '../components/ProcesandoDatos/ProcesandoDatos';
import { renovarToken, logOut } from '../services/Login.service';
import { Departamento, RespuestaAuthToken } from '../interfaces/interfaces';
import { LoadingContext } from '../contexts/LoadingContext/LoadingContext';
import { IUTypes } from '../types/IUTypes';

export const RutasPrivadas = () =>
{
  const {auth, dispatch} = useContext(AuthContext);
  const {dispatchLoading} = useContext(LoadingContext);
  const location = useLocation();

  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [busquedavisible, setBusquedavisible] = useState<boolean>(false);

  useEffect(() =>
  {
    if (location.pathname !== '/web' && (auth && auth.isLogged))
    {
      renovarToken()
        .then((s: RespuestaAuthToken) =>
        {
          localStorage.removeItem('token');
          localStorage.setItem('token', s.token);

          const actionUsuario =
          {
            type: AuthTypes.asignarDatos,
            payload:
            {
              isLogged: s.estado,
              nombreUsuario: s.usuario.given_name,
              imgUsuario: s.usuario.picture
            }
          };

          dispatch(actionUsuario);
        })
        .catch(() =>
        {
          logOut(dispatch);
        });
    }

    return () =>
    {
      dispatchLoading({type: IUTypes.loadingIniciado});
    };
  }
  , [location.pathname]);

  if (auth && !auth.isLogged)
  {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    return (<Navigate to='/login' />);
  }

  const abrirCerrarBusqueda = () =>
  {
    setBusquedavisible(!busquedavisible);
  };

  return (
    <Fragment>
      <Header abrirCerrarBusqueda={abrirCerrarBusqueda} />

      <ProcesandoDatos />

      <Routes>
        <Route path="uno" element={
          <AnunciosPage
            abrirCerrarBusqueda={abrirCerrarBusqueda}
            busquedavisible={busquedavisible}
            departamento={'la-paz'}
            departamentos={departamentos}
            pagina={'uno'}
            setDepartamentos={setDepartamentos}
          />
        }
        />

        <Route path="dos" element={
          <AnunciosPage
            abrirCerrarBusqueda={abrirCerrarBusqueda}
            busquedavisible={busquedavisible}
            departamento={'la paz'}
            departamentos={departamentos}
            pagina={'dos'}
            setDepartamentos={setDepartamentos}
          />
        }
        />

        <Route path="*" element={<Navigate to="uno" replace/>} />
      </Routes>
      <Outlet />
    </Fragment>
  );
};
