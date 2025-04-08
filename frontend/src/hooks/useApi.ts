import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";

export default function useApi<T>(url: string, config?: AxiosRequestConfig) {
  const [data, setData] = useState<T | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, config);

        if (response.status === 200) {
          setData(response.data);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, config]);

  return { data, setData, isError, isLoading };
}
