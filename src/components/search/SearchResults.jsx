import AppContext from '@/lib/context';
import { useContext } from 'react';

function SearchResults() {
  const { characters, showFavoriteList, favoriteSearchFilter } = useContext(AppContext);
  return (
    <span className="search-results">{showFavoriteList ? favoriteSearchFilter.length : characters.length} Results</span>
  );
}

export default SearchResults;
