import styles from './NavBar.module.scss';
import { BiFile, BiFileFind } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import anonimo from '../../assets/anonimo.svg';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { logOut } from '../../services/Login.service';
import { LoadingContext } from '../../contexts/LoadingContext/LoadingContext';
import { IUTypes } from '../../types/IUTypes';

interface PropsNavBar
{
  abrirCerrarMenu: () => void;
  menuvisible: boolean;
}

export const NavBar = ({abrirCerrarMenu, menuvisible}: PropsNavBar) =>
{
  const {auth, dispatch} = useContext(AuthContext);
  const {dispatchLoading} = useContext(LoadingContext);

  const location = useLocation();

  const handleLogout = () =>
  {
    logOut(dispatch);
  };

  const handleOnClick = () =>
  {
    dispatchLoading({type: IUTypes.loadingIniciado});

    abrirCerrarMenu();
  };

  return (
    <div className={`${styles.navBar} ${menuvisible ? styles.mostrarSideBar : ''} `} >

      <div className={`${styles.sideBar} ${menuvisible ? styles.mostrarMenu : ''}  `}>
        <div className={styles.sideBarContenido} >
          <div className={styles.cerrar} onClick={ abrirCerrarMenu }> <AiOutlineClose className={styles.cerrarMenu} /> </div>
          <div className={styles.usuarioIcono}>
            {
              auth.imgUsuario !== 'anonimo'
                ? <img src={auth.imgUsuario} alt="usuario" />
                : <img src={anonimo} alt="usuario" />
            }
          </div>
          <div className={styles.usuarioNombre}> Hola: {(auth.nombreUsuario || 'invitado').toUpperCase() }</div>
          <button onClick={handleLogout}>Cerrar sesión</button>

          <div className={styles.divider}></div>

          <nav>
            <ul>
              <li>
                <Link to="/web/uno"
                  className={ location.pathname === '/web/uno' ? `${styles.active}` : ''}
                  onClick={ handleOnClick }
                >
                  <BiFile className={styles.iconPagina} /> Ver sitio 1
                </Link>
              </li>
              <li>
                <Link to="/web/dos"
                  className={ location.pathname === '/web/dos' ? `${styles.active}` : ''}
                  onClick={ handleOnClick }
                >
                  <BiFileFind className={styles.iconPagina} /> Ver sitio 2
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
