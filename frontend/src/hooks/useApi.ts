import { useState, useEffect } from "react";
import axios from "axios";

export default function useApi() {
  const [galleries, setGalleries] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGalleries = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/galleries");

        if (response.status === 200) {
          setGalleries(response.data);
          console.log(response.data);
        } else {
          setIsError("Failed to fetch galleries.");
        }
      } catch (error) {
        setIsError("Error fetching data.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  return { galleries, isError, isLoading };
}
