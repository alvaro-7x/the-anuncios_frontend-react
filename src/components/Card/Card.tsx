
import styles from './Card.module.scss';
import { BiAlarm, BiCalendarEvent, BiLinkAlt } from 'react-icons/bi';
import { darFormatoFecha, getNombreDepartamento } from '../../utils/Utils';
import { Anuncio, Departamento } from '../../interfaces/interfaces';

interface PropsCard
{
  anuncio: Anuncio;
  departamento: string;
  departamentos: Departamento[];
}

export const Card = ({anuncio, departamento, departamentos}: PropsCard) =>
{
  const logoEmpresa = anuncio.logoEmpresa.length > 0
    ? anuncio.logoEmpresa
    : './logo_default.svg';

  return (
    <div className={styles.card} >
      <span className={styles.estado}> {anuncio.estado} </span>

      <div className={styles.header}>
        <div className={styles.detalles}>
          <h3 className={styles.puesto}> {anuncio.titulo} </h3>
          <span className={styles.empresa}> {anuncio.empresa} </span>
          <span className={styles.ciudad}> { getNombreDepartamento(departamentos, departamento)} </span>
        </div>
        <div className={styles.imgEmpresa}
          style={{'backgroundImage': `url(${logoEmpresa})` }}>
        </div>
      </div>

      <div className={styles.body}>

        <div className={styles.datos}>
          <BiLinkAlt className={styles.icono} />
          <div className={styles.informacion}>
            <span className={styles.titulo}>Enlace original: </span>
            <span className={styles.subtitulo}><a href={anuncio.enlace} target="_blank">Ver página</a></span>
          </div>
        </div>

        <div className={styles.datos}>
          <BiCalendarEvent className={styles.icono} />
          <div className={styles.informacion}>
            <span className={styles.titulo}>Publicado el</span>
            <span className={styles.subtitulo} dangerouslySetInnerHTML={{ __html: darFormatoFecha(anuncio.fechaPublicacion) }}>
            </span>
          </div>
        </div>
        <div className={styles.datos}>
          <BiAlarm className={styles.icono} />
          <div className={styles.informacion}>
            <span className={styles.titulo}>Vence el:</span>
            <span className={styles.subtitulo}> {anuncio.fechaVencimiento} </span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        {
          anuncio.fuente
            ? <a href={anuncio.fuente} target="_blank" className={styles.btnFuente}>Ver fuente</a>
            : <span className={styles.sinFuente}></span>
        }
      </div>
    </div>
  );
};
