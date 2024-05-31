import FavoritesCounter from '@/components/favorite/FavoriteCounter/FavoritesCounter';
import './Header.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '@/lib/context';

function Header() {
  const { setShowFavoriteList } = useContext(AppContext);

  return (
    <header className="header-container">
      <Link to="/" onClick={() => setShowFavoriteList(false)}>
        <img alt="marvel logo" src="/assets/MarvelLogo.svg" />
      </Link>
      <FavoritesCounter />
    </header>
  );
}

export default Header;
