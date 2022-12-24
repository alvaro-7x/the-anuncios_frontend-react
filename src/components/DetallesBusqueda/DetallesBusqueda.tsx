
import { AiOutlineClose } from 'react-icons/ai';
import { getNombreDepartamento } from '../../utils/Utils';
import { Busqueda, Departamento } from '../../interfaces/interfaces';
import styles from './DetallesBusqueda.module.scss';

interface PropsDetallesBusqueda
{
  busqueda: Busqueda;
  departamentos: Departamento[];
  detalleBusquedaAbierto: boolean;
  resultadosBusqueda: number;
  setDetalleBusquedaAbierto: (o: boolean)=>void;
}

export const DetallesBusqueda = ({busqueda, departamentos, detalleBusquedaAbierto, resultadosBusqueda, setDetalleBusquedaAbierto}: PropsDetallesBusqueda) =>
{
  const handleCerrar = () =>
  {
    setDetalleBusquedaAbierto(false);
  };

  return (
    <div className={`${styles.containerResultados} ${detalleBusquedaAbierto ? styles.containerResultadosVisible : ''} `}>
      <div className={styles.detalles}>
        <div className={styles.cerrar} onClick={handleCerrar}> <AiOutlineClose /> </div>
        <h2 className={styles.titulo}>Resultados</h2>
        <div className={styles.cantidad}>Se encontráron {resultadosBusqueda} anuncios</div>

        <div className={styles.terminosBusqueda}>
          <span className={styles.label}>Departamento: </span>
          <span className={styles.texto}>{getNombreDepartamento(departamentos, busqueda.departamento)}</span>
        </div>

        <div className={styles.terminosBusqueda}>
          <span className={styles.label}>Termino: </span>
          <span className={styles.texto}>{busqueda.termino}</span>
        </div>

      </div>
    </div>
  );
};
