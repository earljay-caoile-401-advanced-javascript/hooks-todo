import { useState, useEffect } from 'react';

function useFetch(inputUrl) {
  const [url, setUrl] = useState(inputUrl || '');
  const [request, setRequest] = useState({ method: 'GET' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [response, setResponse] = useState();

  useEffect(() => {
    async function customFetch() {
      await setIsLoading(true);
      await setError(null);
      await setResponse(null);

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

      await setIsLoading(false);

      if (res.status >= 300) {
        await setError(res);
        return;
      }

      await setResponse(await res.json());
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
