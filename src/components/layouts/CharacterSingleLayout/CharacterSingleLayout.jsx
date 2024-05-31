import './CharacterSingleLayout.css';
import PropTypes from 'prop-types';

function CharacterSingleLayout({ children }) {
  return <main className="character-single-layout">{children}</main>;
}

CharacterSingleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CharacterSingleLayout;
