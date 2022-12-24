
import { useEffect } from 'react';
import makeAsyncScriptLoader from 'react-async-script';

declare const window: any;

const URL: string = import.meta.env.VITE_RECAPTCHA_URL || '';
const SITEKEY:string = import.meta.env.VITE_RECAPTCHA_SITEKEY || '';

interface PropsBtnRecaptcha
{
  getResponseRecaptcha: (response: string|undefined) => void;
}

const BtnRecaptchaHtml = () =>
{
  return (
    <form action="?" method="POST">
      <div id="html_element"></div>
    </form>
  );
};

const BtnRecaptchaWrapper = makeAsyncScriptLoader(URL,
  {
    callbackName: 'onloadCallback',
    globalName: 'grecaptcha',
    removeOnUnmount: true,
    scriptId: 'script-recaptcha'
  })(BtnRecaptchaHtml);

export const BtnRecaptcha = ({getResponseRecaptcha}: PropsBtnRecaptcha) =>
{
  useEffect(() =>
  {
    return () => removerDivRecaptcha();
  }, []);

  const removerDivRecaptcha = () =>
  {
    const divInterno = document.getElementsByClassName('g-recaptcha-bubble-arrow');

    if (divInterno.length > 0)
    {
      const divRecaptcha = divInterno[0].parentElement;
      if (divRecaptcha && divRecaptcha.parentElement)
      {
        divRecaptcha.parentElement.removeChild(divRecaptcha);
      }
    }
  };

  const onloadCallback = () =>
  {
    if (!window || !window.grecaptcha)
    {
      return;
    }

    window.grecaptcha.render('html_element',
      {
        'sitekey': SITEKEY,
        'callback': verifyCallback
      });
  };

  const verifyCallback = (response: string) =>
  {
    getResponseRecaptcha(response);
  };

  return (<BtnRecaptchaWrapper asyncScriptOnLoad={onloadCallback} />);
};
