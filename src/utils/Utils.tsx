
import { Departamento } from '../interfaces/interfaces';

const meses: string[] = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];

const obtenerFecha = (fecha: string): string =>
{
  const fechaOriginal = fecha.split('-');
  if (fechaOriginal.length === 3)
  {
    const [anio, mes, dia] = fechaOriginal;
    const nuevoMes:string = meses[parseInt(mes) - 1];
    return `${dia}/${nuevoMes}/${anio}`;
  }
  else
  {
    return fecha;
  }
};

export const darFormatoFecha = (value: string): string =>
{
  const fechaPublicacion = value.split('|');
  let fecha: string;
  if (fechaPublicacion.length === 1)
  {
    fecha = value;
  }
  else if (fechaPublicacion.length === 2)
  {
    const [fechaDate, fechaText] = fechaPublicacion;
    fecha = `Aproximadamente el:<br/>${obtenerFecha(fechaDate)}<br/>(${fechaText})`;
  }
  else
  {
    fecha = value;
  }
  return fecha;
};

export const getNombreDepartamento = (departamentos: Departamento[], departamento: string) =>
{
  let tmpDepartamento: Departamento|undefined;

  if (departamentos && departamentos.length > 0)
  {
    tmpDepartamento = departamentos.find((d: Departamento) => d.value === departamento);
  }

  return tmpDepartamento ? tmpDepartamento.text : '';
};
