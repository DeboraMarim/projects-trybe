import { useCallback, useEffect, useState } from 'react';

function useFetch(url) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const rmv = useCallback((array) => {
    const planetsWithoutResidents = array.map(({ residents, ...go }) => go);
    setPlanets(planetsWithoutResidents);
  }, []);

  const getPlants = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      await rmv(data.results);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [url, rmv]);

  useEffect(() => {
    getPlants();
  }, [getPlants]);

  return {
    planets,
    isLoading,
    error,
    setPlanets,
  };
}

export default useFetch;
