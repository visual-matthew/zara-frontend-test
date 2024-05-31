import './ComicCard.css';
import PropTypes from 'prop-types';

function ComicCard({ comicInfo }) {
  return (
    <li data-testid="comic-card" className="comic-card-container">
      <img
        className="comic-image"
        src={`${comicInfo.thumbnail.path}.${comicInfo.thumbnail.extension}`}
        alt={comicInfo.title}
      />
      <p className="comic-title">{comicInfo.title}</p>
    </li>
  );
}

ComicCard.propTypes = {
  comicInfo: PropTypes.object,
};

export default ComicCard;
