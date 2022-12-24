
import { Fragment, UIEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { CardContainer } from '../../components/CardContainer/CardContainer';
import { DetallesBusqueda } from '../../components/DetallesBusqueda/DetallesBusqueda';
import { FormularioBusqueda } from '../../components/FormularioBusqueda/FormularioBusqueda';
import { IUTypes } from '../../types/IUTypes';
import { listarDatosPagina } from '../../services/Datos.service';
import { LoadingContext } from '../../contexts/LoadingContext/LoadingContext';
import { logOut } from '../../services/Login.service';
import { Anuncio, Busqueda, Departamento, RespuestaAnuncio } from '../../interfaces/interfaces';

interface PropsAnunciosPage
{
  abrirCerrarBusqueda: ()=>void;
  busquedavisible: boolean;
  departamento: string;
  departamentos: Departamento[];
  pagina: string;
  setDepartamentos: (d: Departamento[])=>void;
}

export const AnunciosPage = ({ abrirCerrarBusqueda, busquedavisible, departamento, departamentos, pagina, setDepartamentos }: PropsAnunciosPage) =>
{
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [nroPagina, setNroPagina] = useState<number>(1);
  const [totalPaginas, setTotalPagina] = useState<number>(1);

  const [procesandoScroll, setProcesandoScroll] = useState<boolean>(false);
  const [existeMasAnuncios, setExisteMasAnuncios] = useState<boolean>(true);

  const [detalleBusquedaAbierto, setDetalleBusquedaAbierto] = useState<boolean>(false);

  const {dispatch} = useContext(AuthContext);
  const {dispatchLoading} = useContext(LoadingContext);

  const [resultadosBusqueda, setResultadosBusqueda] = useState<number>(-1);
  const [busqueda, setBusqueda] = useState<Busqueda>({departamento: '', termino: ''});

  const handleScroll = (event: UIEvent<HTMLElement>) =>
  {
    // const alturaMax = event.target.scrollTopMax;
    const alturaMax = event.currentTarget.scrollHeight - event.currentTarget.clientHeight;
    const scrollTop = event.currentTarget.scrollTop;

    if (((alturaMax - 400) <= scrollTop) && alturaMax !== 0 && !procesandoScroll)
    {
      if (nroPagina >= totalPaginas)
      {
        setProcesandoScroll(false);
        setExisteMasAnuncios(false);
        return;
      }

      setProcesandoScroll(true);

      const dep = busqueda.departamento !== '' ? busqueda.departamento : departamento;
      const ter = busqueda.termino !== '' ? busqueda.termino : '';
      const nro = nroPagina + 1;

      listarDatosPagina(pagina, dep, ter, nro)
        .then((s: RespuestaAnuncio) =>
        {
          setAnuncios([...anuncios, ...s.anuncios]);
          setDepartamentos(s.departamentos);
          setTotalPagina(parseInt(s.totalPaginas));

          setNroPagina(nroPagina + 1);
          setProcesandoScroll(false);
        })
        .catch((e) =>
        {
          setProcesandoScroll(false);
          if (e.estado === false)
          {
            logOut(dispatch);
          }
        });
    }
  };

  useEffect(() =>
  {
    const dep = departamento;
    const ter = '';

    setExisteMasAnuncios(true);
    setNroPagina(1);
    const nro = 1;

    dispatchLoading({type: IUTypes.loadingIniciado});

    listarDatosPagina(pagina, dep, ter, nro)
      .then((s: RespuestaAnuncio) =>
      {
        setAnuncios(s.anuncios);
        setDepartamentos(s.departamentos);
        setTotalPagina(parseInt(s.totalPaginas));

        dispatchLoading({type: IUTypes.loadingTerminado});
      })
      .catch((e) =>
      {
        dispatchLoading({type: IUTypes.loadingTerminado});
        if (e.estado === false)
        {
          logOut(dispatch);
        }
      });

    return () =>
    {
      setDetalleBusquedaAbierto(false);
      setBusqueda({departamento: '', termino: ''});
    };
  }
  , [pagina]);

  const buscarAnuncios = (busqueda: Busqueda) =>
  {
    setBusqueda(busqueda);

    if (busqueda.departamento === '')
    {
      return;
    }

    const dep = busqueda.departamento !== '' ? busqueda.departamento : departamento;
    const ter = busqueda.termino !== '' ? busqueda.termino : '';

    dispatchLoading({type: IUTypes.loadingIniciado});
    setResultadosBusqueda(-1);

    setBusqueda({
      departamento: dep,
      termino: ter
    });

    setNroPagina(1);
    const nro = 1;
    setAnuncios([]);

    listarDatosPagina(pagina, dep, ter, nro)
      .then((s: RespuestaAnuncio) =>
      {
        setAnuncios(s.anuncios);
        setDepartamentos(s.departamentos);
        setTotalPagina(parseInt(s.totalPaginas));

        setResultadosBusqueda(parseInt(s.totalAnuncios));
        setDetalleBusquedaAbierto(true);
        dispatchLoading({type: IUTypes.loadingTerminado});

        if (totalPaginas === 1)
        {
          setExisteMasAnuncios(false);
        }
      })
      .catch((e) =>
      {
        dispatchLoading({type: IUTypes.loadingTerminado});
        if (e.estado === false)
        {
          logOut(dispatch);
        }
      });
  };

  return (
    <Fragment>
      <DetallesBusqueda busqueda={busqueda}
        departamentos={departamentos}
        detalleBusquedaAbierto={detalleBusquedaAbierto}
        resultadosBusqueda={resultadosBusqueda}
        setDetalleBusquedaAbierto={setDetalleBusquedaAbierto}
      />

      <CardContainer anuncios={anuncios}
        departamento={busqueda.departamento || departamento}
        departamentos={departamentos}
        existeMasAnuncios={existeMasAnuncios}
        handleScroll={handleScroll}
      />

      <FormularioBusqueda abrirCerrarBusqueda={abrirCerrarBusqueda}
        buscarAnuncios={buscarAnuncios}
        busquedavisible={busquedavisible}
        departamentos={departamentos}
      />
    </Fragment>
  );
};
