import './CharacterDetail.css';
import AddToFavorite from '@/components/favorite/AddToFavorite/AddToFavorite';
import PropTypes from 'prop-types';

function CharacterDetail({ character }) {
  const { name, description } = character;
  const image = `${character.thumbnail.path}.${character.thumbnail.extension}`;
  return (
    <section className="character-detail">
      <div className="character-detail-container">
        <img className="character-image" src={image} alt={name} />
        <div className="character-info">
          <div className="character-name">
            <h3>{name}</h3>
            <AddToFavorite character={character} />
          </div>
          <p className="character-description">{description || 'No description available'}</p>
        </div>
        <div className="card-cut" />
      </div>
    </section>
  );
}

CharacterDetail.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      path: PropTypes.string.isRequired,
      extension: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CharacterDetail;
