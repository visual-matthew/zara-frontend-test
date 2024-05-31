import useFavoriteCharacters from '@/hooks/useFavoriteCharacters';
import './FavoritesCounter.css';
import HeartedIcon from '@/assets/HeartedIcon.svg?react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '@/lib/context';

function FavoritesCounter() {
  const { setShowFavoriteList } = useContext(AppContext);
  const { characters } = useFavoriteCharacters();

  return (
    <Link
      aria-label="View favorites"
      to="/"
      onClick={() => setShowFavoriteList((prevState) => !prevState)}
      className="favorites-counter-container"
    >
      <HeartedIcon />
      <span>{Object.values(characters).length}</span>
    </Link>
  );
}

export default FavoritesCounter;
