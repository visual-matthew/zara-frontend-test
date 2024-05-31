import './Card.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddToFavorite from '@/components/favorite/AddToFavorite/AddToFavorite';

function Card({ character }) {
  return (
    <li className="card-wrapper">
      <Link className="card-image-wrapper" to={`/${character.id}`} aria-labelledby={`character-name-${character.name}`}>
        <img
          className="card-image"
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
      </Link>
      <hr />
      <div className="card-info-wrapper">
        <span className="character-name">{character.name}</span>
        <AddToFavorite character={character} />
      </div>
      <div className="card-cut" />
    </li>
  );
}

Card.propTypes = {
  character: PropTypes.shape({
    thumbnail: PropTypes.shape({
      path: PropTypes.string.isRequired,
      extension: PropTypes.string.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};
export default Card;
