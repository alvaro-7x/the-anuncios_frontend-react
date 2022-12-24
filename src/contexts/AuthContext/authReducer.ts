import { AuthTypes } from '../../types/AuthTypes';
import { AuthActions } from '../../actions/AuthActions';
import { AuthState } from '../../interfaces/interfaces';

const initState =
{
  isLogged: false,
  nombreUsuario: '',
  imgUsuario: ''
};

export const authReducer = (state: AuthState, action: AuthActions) =>
{
  switch (action.type)
  {
    case AuthTypes.login:
      return {
        ...state,
        isLogged: action.payload.isLogged
      };

    case AuthTypes.logOut:
      return initState;

    case AuthTypes.asignarDatos:
      return {
        ...state,
        isLogged: action.payload.isLogged,
        nombreUsuario: action.payload.nombreUsuario,
        imgUsuario: action.payload.imgUsuario
      };

    default:
      return state;
  }
};
