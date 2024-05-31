import CharacterDetail from '@/components/character/CharacterDetail';
import ComicGrid from '@/components/comic/ComicGrid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCharactersById } from '@/services/getCharacterById';
import { getCharacterComicsById } from '@/services/getComicsByCharacter';
import Spinner from '@/components/loading/Spinner';
import './CharacterSinglePage.css';

function CharacterSinglePage() {
  const { id } = useParams();
  const [characterDetails, setCharacterDetails] = useState();
  const [characterComics, setCharacterComics] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const characterInfoResponse = await getCharactersById(id);
        setCharacterDetails(characterInfoResponse);
        const comicByCharacterResponse = await getCharacterComicsById(id);
        setCharacterComics(comicByCharacterResponse);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCharacterDetails();
  }, [id]);

  if (error)
    return (
      <div role="alert" aria-live="assertive" className="error-message">
        {error}
      </div>
    );

  if (!characterDetails || !characterComics) {
    return <Spinner />;
  }

  return (
    <div>
      <CharacterDetail character={characterDetails} />
      <section className="character-single-page-comics-wrapper" aria-labelledby="comics-heading">
        <h2 className="character-single-page-comics">Comics</h2>
        <ComicGrid comics={characterComics} />
      </section>
    </div>
  );
}

export default CharacterSinglePage;
