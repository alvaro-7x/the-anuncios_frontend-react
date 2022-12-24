import { AuthTypes } from '../types/AuthTypes';

export type AuthActions =
  {
    type: AuthTypes.login,
    payload: {isLogged: boolean}
  } |
  {
    type: AuthTypes.logOut
  } |
  {
    type: AuthTypes.asignarDatos,
    payload: {isLogged: boolean; nombreUsuario: string; imgUsuario: string}
  };

