
import makeAsyncScriptLoader from 'react-async-script';

declare const window: any;

const URL:string = import.meta.env.VITE_GOOGLE_URL || '';
const CLIENT_ID:string = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

interface PropsBtnGoogle
{
  getResponseGoogle: (token: string|undefined) => void;
}

interface ResponseApiGoogle
{
  clientId: string;
  client_id: string;
  credential: string;
  select_by: string;
}

const BtnGoogleHtml = () =>
{
  return (
    <div id="buttonDiv"></div>
  );
};

const BtnGoogleWrapper = makeAsyncScriptLoader(URL,
  {
    removeOnUnmount: true,
    scriptId: 'script-google'
  })(BtnGoogleHtml);

export const BtnGoogle = ({getResponseGoogle}: PropsBtnGoogle) =>
{
  const onloadCallback = () =>
  {
    if (!window || !window.google)
    {
      return;
    }

    window.google.accounts.id.initialize(
      {
        client_id: CLIENT_ID,
        callback: handleGoogleResponse
      });

    window.google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large' }
    );

    // window.google.accounts.id.prompt();
  };

  const cerrarSesion = (token: string|undefined) =>
  {
    window.google.accounts.id.disableAutoSelect();

    if (token)
    {
      const { email } = JSON.parse(atob(token.split('.')[1]));
      window.google.accounts.id.revoke(email);
    }
  };

  const handleGoogleResponse = (response: ResponseApiGoogle) =>
  {
    if (response && response.credential)
    {
      const tmpToken = response.credential || undefined;

      // Cerramos la sesion de la cuenta de google por que no queremos que la autenticacion
      // sea notable en otros sitios
      cerrarSesion(tmpToken);

      getResponseGoogle(tmpToken);
    }
  };

  return (<BtnGoogleWrapper asyncScriptOnLoad={onloadCallback} />);
};
