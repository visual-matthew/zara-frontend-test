import './CharacterListLayout.css';
import PropTypes from 'prop-types';

function CharacterListLayout({ children }) {
  return <main className="character-list-layout">{children}</main>;
}

CharacterListLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CharacterListLayout;
