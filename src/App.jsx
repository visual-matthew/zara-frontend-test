import { Route, Routes } from 'react-router-dom';
import Header from '@/components/header';
import CharacterListLayout from '@/components/layouts/CharacterListLayout/CharacterListLayout';
import CharacterSingleLayout from '@/components/layouts/CharacterSingleLayout/CharacterSingleLayout';
import CharacterSinglePage from '@/pages/CharacterSinglePage/CharacterSinglePage';
import CharacterListPage from './pages/CharacterListPage/CharacterListPage';
import AppContext from '@/lib/context';
import { useMemo, useState } from 'react';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteCharacters, setFavoriteCharacters] = useState({});
  const [favoriteSearchFilter, setFavoriteSearchFilter] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showFavoriteList, setShowFavoriteList] = useState(false);

  const initialValue = useMemo(
    () => ({
      characters,
      setCharacters,
      debouncedSearch,
      setDebouncedSearch,
      favoriteCharacters,
      setFavoriteCharacters,
      showFavoriteList,
      setShowFavoriteList,
      favoriteSearchFilter,
      setFavoriteSearchFilter,
      isLoading,
      setIsLoading,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [characters, debouncedSearch, favoriteCharacters, showFavoriteList, favoriteSearchFilter],
  );

  return (
    <AppContext.Provider value={initialValue}>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <CharacterListLayout>
              <CharacterListPage />
            </CharacterListLayout>
          }
        />
        <Route
          path="/:id"
          element={
            <CharacterSingleLayout>
              <CharacterSinglePage />
            </CharacterSingleLayout>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
