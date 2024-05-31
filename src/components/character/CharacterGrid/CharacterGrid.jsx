import Card from '../CharacterCard/Card';
import './CharacterGrid.css';
import PropTypes from 'prop-types';

function CharacterGrid({ characters }) {
  return (
    <ul className="character-grid-container">
      {characters.map((character) => (
        <Card key={character.id} character={character} />
      ))}
    </ul>
  );
}

CharacterGrid.propTypes = {
  characters: PropTypes.array.isRequired,
};

export default CharacterGrid;
