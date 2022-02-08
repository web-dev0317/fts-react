import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const JWT = useSelector(({ authReducer }) => authReducer.JWT);

  const request = useCallback(
    async (requestConfig) => {
      setIsLoading(true);
      setError(null);

      const authHeader = JWT
        ? {
            Authorization: 'Bearer ' + JWT,
          }
        : {};

      let data = null;
      try {
        const response = await fetch(
          'http://localhost:8080' + requestConfig.url,
          {
            method: requestConfig.method ? requestConfig.method : 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...requestConfig.headers,
              ...authHeader,
            },
            body: requestConfig.body
              ? JSON.stringify(requestConfig.body)
              : null,
          }
        );
        setIsLoading(false);
        if (!response.ok) {
          throw new Error();
        }
        // using it only for login/sign up...
        const resHeaders = response.headers;
        const JWT = resHeaders.get('Authorization').split(' ')[1];
        const roomId = resHeaders.get('X-Room-Id');
        data = {
          JWT,
          roomId,
        };
      } catch (e) {
        setError('Something went wrong. Please try again after sometime.');
      } finally {
        setIsLoading(false);
      }
      return data;
    },
    [JWT]
  );

  return {
    request,
    isLoading,
    error,
  };
};
