import axios from 'axios';
import { setInterceptor } from './Interceptor';

const url: string = import.meta.env.VITE_API_URL as string;

export const listarDatosPagina = (sitioWeb = 'uno', departamento: string, termino: string, page = 1) =>
{
  const instance = axios.create({
    baseURL: url,
    headers:
    {
      'Content-Type': 'application/json'
    },
    params:
    {
      departamento,
      termino,
      page
    }
  });

  setInterceptor(instance);

  return instance.get(`/web/${sitioWeb}`)
    .then((success) => Promise.resolve(success.data))
    .catch((error) => Promise.reject(error.response.data));
};
