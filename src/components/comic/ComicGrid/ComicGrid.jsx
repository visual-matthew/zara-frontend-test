import ComicCard from '../ComicCard';
import './ComicGrid.css';
import PropTypes from 'prop-types';

function ComicGrid({ comics }) {
  return (
    <section>
      <ul className="comic-grid-container">
        {comics.map((comic) => (
          <ComicCard key={comic.id} comicInfo={comic} />
        ))}
      </ul>
    </section>
  );
}

ComicGrid.propTypes = {
  comics: PropTypes.array.isRequired,
};

export default ComicGrid;
