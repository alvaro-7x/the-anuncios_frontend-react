import { post } from './utils';
import axios from 'axios';
import { setInterceptor } from './Interceptor';
import { AuthTypes } from '../types/AuthTypes';
import { AuthActions } from '../actions/AuthActions';
import { RespuestaAuth } from '../interfaces/interfaces';

const url = `${import.meta.env.VITE_API_URL}/auth`;

export const verificarTokenGoogle = (token: string|undefined): Promise<RespuestaAuth> =>
{
  const data =
  {
    id_token: (token || '')
  };

  return post(`${url}/google`, JSON.stringify(data));
};

export const verificarResponseRecaptcha = (response: string|undefined): Promise<RespuestaAuth> =>
{
  const data =
  {
    responseCaptcha: (response || '')
  };

  return post(`${url}/recaptcha`, JSON.stringify(data));
};

export const renovarToken = () =>
{
  const instance = axios.create({
    baseURL: url,
    headers:
    {
      'Content-Type': 'application/json'
    }
  });

  setInterceptor(instance);

  return instance.get(`${url}/renovar-token`)
    .then((success) => Promise.resolve(success.data))
    .catch((error) => Promise.reject(error.response.data));
};

export const logOut = (dispatch: ((a: AuthActions)=>void)) =>
{
  dispatch({ type: AuthTypes.logOut });

  localStorage.removeItem('token');
  localStorage.removeItem('auth');
};
