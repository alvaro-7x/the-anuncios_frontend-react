import styles from './ProcesandoDatos.module.scss';
import { Spinner } from '../Spinner/Spinner';
import { useContext } from 'react';
import { LoadingContext } from '../../contexts/LoadingContext/LoadingContext';

export const ProcesandoDatos = () =>
{
  const {isLoading} = useContext(LoadingContext);

  return (
    <div className={`${styles.container} ${isLoading.isLoading ? styles.containerActive : ''}`}>
      <Spinner texto={true} />
    </div>
  );
};
