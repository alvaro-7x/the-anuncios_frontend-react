
import styles from './FormularioBusqueda.module.scss';
import { FormEvent, useState } from 'react';
import { Busqueda, Departamento } from '../../interfaces/interfaces';

interface PropsFormularioBusqueda
{
  abrirCerrarBusqueda: ()=>void;
  buscarAnuncios: (b: Busqueda)=>void;
  busquedavisible: boolean;
  departamentos: Departamento[];
}

export const FormularioBusqueda = ({abrirCerrarBusqueda, buscarAnuncios, busquedavisible, departamentos}: PropsFormularioBusqueda) =>
{
  const [form, setForm] = useState<Busqueda>({departamento: '', termino: ''});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();

    if (form.departamento.length === 0)
    {
      return;
    }

    const departamento = form.departamento.replace(/[^a-zA-Z- ]/g, '');
    const termino = form.termino.replace(/[^a-zA-Z- ]/g, '');

    buscarAnuncios({departamento, termino});
    setForm({departamento: '', termino: ''});
    abrirCerrarBusqueda();

    e.currentTarget.reset();
  };

  return (
    <div className={`${styles.containerBuscar} ${busquedavisible ? styles.mostrarContainerBuscar : ''} `}>
      <div className={`${styles.posicionBuscar} ${busquedavisible ? styles.mostrarPosicionBuscar : ''} `}>
        <form onSubmit={handleSubmit} >
          <div className={ `${styles.formField} ${form.departamento.length > 0 ? styles.formControlActive : ''} ` }>
            <label className={styles.formLabel}>* En Departamento</label>
            <div className={`${styles.select}  `}>
              <select name="departamento" className={styles.formControl}
                onChange={ (e) => setForm({...form, departamento: e.target.value}) } >
                <option className={styles.option} value="" />
                {
                  departamentos.map((d: Departamento, index: number) =>
                  {
                    return <option key={index} className={styles.option} value={d.value} > {d.text}</option>;
                  })
                }
              </select>
            </div>
          </div>

          <div className={ `${styles.formField} ${form.termino.length > 0 ? styles.formControlActive : ''} ` }>
            <label className={styles.formLabel}>Termino a buscar</label>
            <input type="text"
              name="termino"
              className={styles.formControl}
              onChange={ (e) => setForm({...form, termino: e.target.value}) } />
          </div>

          <div className={styles.acciones}>
            <button type="button" onClick={ () =>
            {
              abrirCerrarBusqueda();
            }}>Cerrar</button>
            <button type="submit">Buscar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
