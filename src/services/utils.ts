
export const get = (url: string, data: string) =>
{
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data
  };

  return fetch(url, fetchOptions)
    .then(response => response.json())
    .then((data) =>
    {
      if (data.msg)
      {
        const errorMsg = {error: data.msg};
        throw errorMsg;
      }
      return data;
    })
    .catch(error =>
    {
      throw error;
    });
};

export const post = (url: string, data: string) =>
{
  const fetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data
  };

  return fetch(url, fetchOptions)
    .then(response => response.json())
    .then((data) =>
    {
      if (data.msg)
      {
        const errorMsg = {error: data.msg};
        throw errorMsg;
      }
      return data;
    })
    .catch(error =>
    {
      throw error;
    });
};
