import AppContext from '@/lib/context';
import { getCharacters } from '@/services/getCharacters';
import { useContext, useEffect, useState } from 'react';

function useCharacters(limit = 50) {
  const { characters, setCharacters, showFavoriteList, favoriteCharacters, setFavoriteSearchFilter, setIsLoading } =
    useContext(AppContext);
  const [error, setError] = useState(null);
  const { debouncedSearch } = useContext(AppContext);

  useEffect(() => {
    const fetchCharacters = async () => {
      setIsLoading(true);
      try {
        if (showFavoriteList) {
          const filteredFavoriteCharacters = Object.values(favoriteCharacters).filter((character) =>
            character.name.toLowerCase().startsWith(debouncedSearch.toLowerCase()),
          );
          setFavoriteSearchFilter(filteredFavoriteCharacters);
        } else {
          const response = await getCharacters(debouncedSearch);
          setCharacters(response.data.results);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, debouncedSearch, setCharacters, favoriteCharacters, setFavoriteSearchFilter, showFavoriteList]);

  return { characters, error, isError: !!error };
}

export default useCharacters;
