import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthActions } from '../../actions/AuthActions';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { AuthTypes } from '../../types/AuthTypes';
import { BtnGoogle } from '../../components/BtnGoogle/BtnGoogle';
import { BtnRecaptcha } from '../../components/BtnRecaptcha/BtnRecaptcha';
import { verificarTokenGoogle, verificarResponseRecaptcha } from '../../services/Login.service';
import { RespuestaAuth } from '../../interfaces/interfaces';
import styles from './LoginPage.module.scss';

enum TipoVerificacion {
  google,
  recaptcha
}

export const LoginPage = () =>
{
  const {dispatch} = useContext(AuthContext);

  const [tipologin, setTipologin] = useState<number>(-1);
  const [isLoginError, setIsLoginError] = useState<boolean>(false);
  const navigate = useNavigate();

  const getResponseGoogle = (token: string|undefined) =>
  {
    verificarResponse(TipoVerificacion.google, token);
  };

  const getResponseRecaptcha = (response: string|undefined) =>
  {
    verificarResponse(TipoVerificacion.recaptcha, response);
  };

  const verificarResponse = (tipoVerificacion: TipoVerificacion, token: string|undefined) =>
  {
    switch (tipoVerificacion)
    {
      case TipoVerificacion.google:
        verificarTokenGoogle(token)
          .then((resp: RespuestaAuth) =>
          {
            setIsLoginError(false);
            verificacionExitosa(resp);
          })
          .catch(() =>
          {
            setIsLoginError(true);
          });
        return;

      case TipoVerificacion.recaptcha:
        verificarResponseRecaptcha(token)
          .then((resp: RespuestaAuth) =>
          {
            setIsLoginError(false);
            verificacionExitosa(resp);
          })
          .catch(() =>
          {
            setIsLoginError(true);
          });
        return;

      default:
        return;
    }
  };

  const verificacionExitosa = (respuesta: RespuestaAuth) =>
  {
    if (respuesta.token)
    {
      localStorage.setItem('token', respuesta.token);

      const actionLogin: AuthActions =
      {
        type: AuthTypes.login,
        payload:
        {
          isLogged: true
        }
      };

      dispatch(actionLogin);

      return navigate('/web');
    }
    else
    {
      localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.detalles}>
        <div className={styles.login}>

          <div className={styles.contenedorPregunta}>
            <div className={styles.pregunta}>
              ¿Inicia sesión con?
            </div>
            <div className={styles.imgLock}></div>
          </div>

          <div className={`${styles.google} ${tipologin === 1 ? styles.mostrar_google : ''} ${tipologin === 0 ? styles.click_google : ''} ` }
            onClick={ () => setTipologin(0) }
            onMouseOver={ () => setTipologin(0) }
            onMouseOut={ () => setTipologin(-1) } >
            <h2>Con Google</h2>
            <div className={styles.btn_login}>
              <label>Autenticate con tu cuenta de GMAIL, para poder ingresar.</label>
              { isLoginError && <p>Ocurrio un error al realizar el login, vuelva a intentarlo en unos instantes.</p> }
              <div className={styles.btn}>
                <BtnGoogle getResponseGoogle={getResponseGoogle} />
              </div>
            </div>
          </div>

          <div className={`${styles.captcha} ${tipologin === 0 ? styles.mostrar_captcha : ''} ${tipologin === 1 ? styles.click_captcha : ''} ` }
            onClick={ () => setTipologin(1) }
            onMouseOver={ () => setTipologin(1) }
            onMouseOut={ () => setTipologin(-1) } >
            <h2>Con Desafio</h2>
            <div className={styles.btn_login}>
              <label>¡Compruébanos que no eres un robot, pasando el desafio!.</label>
              { isLoginError && <p>Ocurrio un error al realizar el login, vuelva a intentarlo en unos instantes.</p> }
              <div className={styles.btn}>
                <BtnRecaptcha getResponseRecaptcha={getResponseRecaptcha} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
/*
https://paletasdecolores.com/paleta-de-colores-4553/
https://paletasdecolores.com/paleta-de-colores-4553/
*/
