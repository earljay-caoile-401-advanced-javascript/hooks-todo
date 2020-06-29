import { useState, useEffect } from 'react';

/**
 * custom React hook that helps another component perform an API fetch
 * @param {String} inputUrl -  url to perform the fetch with
 * @returns several variables and functions to be used elsewhere
 */
function useFetch(inputUrl) {
  const [url, setUrl] = useState(inputUrl || '');
  const [request, setRequest] = useState({ method: 'GET' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [response, setResponse] = useState();

  useEffect(() => {
    async function customFetch() {
      setIsLoading(true);
      setError(null);
      setResponse(null);

      const res = await fetch(url, {
        method: request.method || 'GET',
        body:
          request.method === 'POST' ||
          request.method === 'PUT' ||
          request.method === 'PATCH'
            ? JSON.stringify(request.body)
            : null,
        headers: { ...request.headers, 'Content-Type': 'application/json' },
      });

      setIsLoading(false);

      if (res.status >= 300) {
        setError(res);
        return;
      }
      console.log('what is res?', res);
      setResponse(await res.json());
    }

    if (request) {
      customFetch();
    }
  }, [request, url]);

  return {
    setUrl,
    setRequest,
    request,
    isLoading,
    error,
    response,
  };
}

export default useFetch;
