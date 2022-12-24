import { Fragment, UIEvent, useContext } from 'react';
import { Anuncio, Departamento } from '../../interfaces/interfaces';
import { Card } from '../Card/Card';
import { LoadingContext } from '../../contexts/LoadingContext/LoadingContext';
import { Spinner } from '../Spinner/Spinner';
import styles from './CardContainer.module.scss';
import { Informacion } from '../Informacion/Informacion';

interface PropsCardContainer
{
  anuncios: Anuncio[];
  departamento: string;
  departamentos: Departamento[];
  existeMasAnuncios: boolean;
  handleScroll: (event: UIEvent<HTMLElement>)=>void;
}

export const CardContainer = ({anuncios, departamento, departamentos, existeMasAnuncios, handleScroll}: PropsCardContainer) =>
{
  const {isLoading} = useContext(LoadingContext);

  return (
    <div className={styles.container} onScroll={ handleScroll }>
      {
        isLoading.isLoading !== true &&
        anuncios.length !== 0 &&
        <Fragment>
          <Informacion />

          <div className={styles.cardContainer}>
            {
              anuncios.map((anuncio: Anuncio, index: number) =>
              {
                return <Card key={index} anuncio={anuncio} departamento={departamento} departamentos={departamentos} />;
              })
            }
          </div>

          <div className={styles.masResultados}>
            {
              existeMasAnuncios
                ? <Spinner texto={false} />
                : <p className={styles.sinMasResultados}>No hay más anuncios</p>
            }
          </div>
        </Fragment>
      }

      {
        isLoading.isLoading !== true &&
        anuncios.length === 0 &&
        <div className={styles.sinAnuncios}>No hay anuncios</div>
      }
    </div>
  );
};
