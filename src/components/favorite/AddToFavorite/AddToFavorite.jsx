import useFavoriteCharacters from '@/hooks/useFavoriteCharacters';
import './AddToFavorite.css';
import HeartIcon from '@/assets/HeartIcon.svg?react';
import HeartedIcon from '@/assets/HeartedIcon.svg?react';

import PropTypes from 'prop-types';
import { useMemo } from 'react';

function AddToFavorite({ character }) {
  const { saveCharacter, removeCharacter, isCharacterFavorited } = useFavoriteCharacters();
  const isCharacterFavorite = useMemo(() => isCharacterFavorited(character.id), [isCharacterFavorited, character.id]);
  const handleSaveToFavorites = () => {
    isCharacterFavorite ? removeCharacter(character.id) : saveCharacter(character);
  };
  return (
    <button
      aria-label="Add to favorites"
      onClick={handleSaveToFavorites}
      className={`add-to-favorite-button ${isCharacterFavorite ? 'favorited' : ''} `}
    >
      {' '}
      {isCharacterFavorite ? <HeartedIcon /> : <HeartIcon />}
    </button>
  );
}

AddToFavorite.propTypes = {
  character: PropTypes.object.isRequired,
};

export default AddToFavorite;
