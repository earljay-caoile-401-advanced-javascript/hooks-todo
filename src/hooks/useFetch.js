import { useState, useEffect } from 'react';

/**
 * custom React hook that helps another component perform an API fetch
 * @param {String} inputUrl -  url to perform the fetch with
 * @returns several variables and functions to be used elsewhere
 */
function useFetch(baseUrl, baseReq) {
  const [url, setUrl] = useState(baseUrl || '');
  const [request, setRequest] = useState(baseReq);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [response, setResponse] = useState();

  /**
   * hook that triggers when a user enters a url or request
   * designed to only do the fetch on a populated request
   */
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
