export interface AuthState
{
  isLogged: boolean;
  nombreUsuario: string;
  imgUsuario: string;
}

export interface LoadingState
{
  isLoading: boolean;
}

export interface Busqueda
{
  departamento: string;
  termino: string;
}

export interface RespuestaAuthToken
{
  estado: boolean;
  token: string;
  usuario: Usuario;
}

export interface Usuario
{
  email: string;
  family_name: string;
  given_name: string;
  picture: string;
  time: Date;
}

export interface RespuestaAnuncio
{
  cantidad: number;
  region: string;
  totalAnuncios: string;
  totalPaginas: string;
  anuncios: Anuncio[];
  departamentos: Departamento[];
}

export interface Anuncio
{
  enlace: string;
  titulo: string;
  empresa: string;
  logoEmpresa: string;
  fechaPublicacion: string;
  fechaVencimiento: string;
  ubicacion: string;
  estado: string;

  categoria: string;
  tipoContrato: string;
  fuente: string;
}

export interface Departamento
{
  value: string;
  text: string;
}

export interface RespuestaAuth
{
  token?: string;
  msg?: string;
}
