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
   * designed to only do a fetch on a populated request
   */
  useEffect(() => {
    async function customFetch() {
      await setIsLoading(true);
      await setError(null);
      await setResponse(null);

      let res = await fetch(url, {
        method: request.method || 'GET',
        body:
          request.method === 'POST' ||
          request.method === 'PUT' ||
          request.method === 'PATCH'
            ? JSON.stringify(request.body)
            : null,
        headers: { ...request.headers, 'Content-Type': 'application/json' },
      });

      if (canRunGet(request, res)) {
        res = await fetch(baseUrl || url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
      }

      await setIsLoading(false);
      await setRequest(null);

      if (res.status >= 300) {
        setError(res);
        return;
      }

      await setResponse(await res.json());
    }

    if (request) {
      customFetch();
    }

    return () => {
      setUrl(null);
      setRequest(null);
    };
  }, [request, baseUrl, url]);

  /**
   * helper function that determines whether a follow-up GET fetch can be run
   * @param {Object} req - request object
   * @param {Object} res - result from the previous fetch
   */
  function canRunGet(req, res) {
    return req && req.runGet && res && res.status < 300;
  }

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
