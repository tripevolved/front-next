import { useEffect, useState } from "react";

export const useFetch = <T = any>(name: string, fetcher: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState<null | T>(null);

  useEffect(() => {
    if (isLoading) setIsLoading(true);
    if (data) setData(null);
    fetcher()
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher, name]);

  return { isLoading, error, data };
};
