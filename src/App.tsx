import './App.css';
import { AppRouter } from './router/AppRouter';
import { AuthContext } from './contexts/AuthContext/AuthContext';
import { authReducer } from './contexts/AuthContext/authReducer';
import { useEffect, useReducer } from 'react';
import { loadingReducer } from './contexts/LoadingContext/loadingReducer';
import { LoadingContext } from './contexts/LoadingContext/LoadingContext';

const initState = () =>
{
  const auth = localStorage.getItem('auth');
  return auth
    ? JSON.parse(auth)
    : { isLogged: false, nombreUsuario: '', imgUsuario: '' };
};

const initStateLoading = () =>
{
  return {
    isLoading: true
  };
};

function App ()
{
  const [auth, dispatch] = useReducer(authReducer, {}, initState);
  const [isLoading, dispatchLoading] = useReducer(loadingReducer, {}, initStateLoading);

  useEffect(() =>
  {
    if (auth)
    {
      localStorage.setItem('auth', JSON.stringify(auth));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{auth, dispatch}}>
      <LoadingContext.Provider value={{isLoading, dispatchLoading}}>
        <AppRouter />
      </LoadingContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
