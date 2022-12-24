import styles from './Header.module.scss';
import { IconContext } from 'react-icons';
import { BiMenu, BiSearch } from 'react-icons/bi';
import { Fragment, useState } from 'react';
import { NavBar } from '../NavBar/NavBar';

interface PropsHeader
{
  abrirCerrarBusqueda: ()=>void;
}

export const Header = ({abrirCerrarBusqueda}: PropsHeader) =>
{
  const [menuvisible, setMenuvisible] = useState<boolean>(false);

  const abrirCerrarMenu = () =>
  {
    setMenuvisible(!menuvisible);
  };

  return (
    <Fragment>
      <IconContext.Provider value={{'color': '#fff', 'size': '27px'}} >
        <header className={styles.header}>
          <div className={styles.nav}>
            <div className={styles.detalles}>
              <BiMenu className={styles.iconMenu} onClick={ abrirCerrarMenu } />
              <h1 className={styles.titulo}>The-anuncios</h1>
            </div>
            <button onClick={abrirCerrarBusqueda}><BiSearch /></button>
          </div>
          <NavBar menuvisible={menuvisible} abrirCerrarMenu={abrirCerrarMenu} />
        </header>
      </IconContext.Provider>
    </Fragment>
  );
};
