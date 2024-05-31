import { useContext, useEffect, useState } from 'react';
import './Search.css';
import SearchResults from './SearchResults';
import SearchIcon from '@/assets/SearchIcon.svg?react';
import AppContext from '@/lib/context';

function Search() {
  const [search, setSearch] = useState('');
  const { setDebouncedSearch } = useContext(AppContext);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [search, setDebouncedSearch]);
  return (
    <div className="search-wrapper">
      <div className="search-container">
        <SearchIcon />
        <input
          placeholder="Search a character..."
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <SearchResults />
    </div>
  );
}

export default Search;
