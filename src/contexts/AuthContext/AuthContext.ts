import { createContext } from 'react';
import { AuthActions } from '../../actions/AuthActions';
import { AuthState } from '../../interfaces/interfaces';

interface AuthContextInterface
{
  auth: AuthState;
  dispatch: (a: AuthActions)=>void;
}

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);
