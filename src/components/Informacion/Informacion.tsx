import styles from './Informacion.module.scss';
import { BiError } from 'react-icons/bi';

export const Informacion = () =>
{
  return (
    <div className={styles.contenedor}>
      <div className={styles.icono}>
        <BiError />
      </div>

      <div className={styles.info}>
        <h3> <BiError className={styles.iconoInline} />Observación</h3>
        <ul>
          <li>La información presentada aquí es propiedad de los sitios web donde es obtenida, <span>todo el credito es para esos sitios web</span>.</li>
          <li>Esta página web <span>NO guarda ningún tipo de información</span>, de la información presentada aquí.</li>
          <li>Esta página web fue desarrollada con fines recreativos.</li>
        </ul>
      </div>
    </div>
  );
};
