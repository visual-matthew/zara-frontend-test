import { useCallback, useContext, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import AppContext from '@/lib/context';

function useFavoriteCharacters() {
  const [storedCharacters, setStoredCharacters] = useLocalStorage('favoriteCharacters', {});
  const { favoriteCharacters, setFavoriteCharacters } = useContext(AppContext);

  useEffect(() => {
    setFavoriteCharacters(storedCharacters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setStoredCharacters(favoriteCharacters);
  }, [favoriteCharacters, setStoredCharacters]);

  const saveCharacter = useCallback(
    (character) => {
      setFavoriteCharacters((prevCharacters) => ({
        ...prevCharacters,
        [character.id]: character,
      }));
    },
    [setFavoriteCharacters],
  );

  const getCharacter = (id) => favoriteCharacters?.[id];

  const removeCharacter = useCallback(
    (id) => {
      setFavoriteCharacters((prevCharacters) => {
        const newCharacters = { ...prevCharacters };
        delete newCharacters[id];
        return newCharacters;
      });
    },
    [setFavoriteCharacters],
  );

  const isCharacterFavorited = (id) => {
    return !!favoriteCharacters[id];
  };

  return {
    characters: favoriteCharacters,
    saveCharacter,
    getCharacter,
    removeCharacter,
    isCharacterFavorited,
  };
}

export default useFavoriteCharacters;
