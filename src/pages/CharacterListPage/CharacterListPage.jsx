import Search from '@/components/search';
import CharacterGrid from '@/components/character/CharacterGrid';
import useCharacters from '@/hooks/useCharacters';
import { useContext } from 'react';
import AppContext from '@/lib/context';
import Spinner from '@/components/loading/Spinner';
import './CharacterListPage.css';

function CharacterListPage() {
  const { characters } = useCharacters();
  const { showFavoriteList, favoriteSearchFilter, isLoading } = useContext(AppContext);
  const charactersList = showFavoriteList ? favoriteSearchFilter : characters;
  return (
    <div className="character-list-page">
      {showFavoriteList && <h1 className="favorites-title">Favorites</h1>}
      <Search />
      {isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <CharacterGrid characters={charactersList} />
      )}
    </div>
  );
}

export default CharacterListPage;
