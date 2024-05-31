import { render, screen } from '@testing-library/react';
import CharacterDetail from './CharacterDetail';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/components/favorite/AddToFavorite/AddToFavorite', () => ({
  default: vi.fn(),
}));
describe('CharacterDetail', () => {
  const character = {
    name: 'Spider-Man',
    description: 'Description',
    thumbnail: {
      path: 'path',
      extension: 'jpg',
    },
  };
  beforeEach(() => {
    render(<CharacterDetail character={character} />);
  });

  test('renders character name', () => {
    expect(screen.getByText(character.name)).toBeInTheDocument();
  });

  test('renders character description', () => {
    expect(screen.getByText(character.description)).toBeInTheDocument();
  });

  test('renders character image', () => {
    const characterImage = screen.getByAltText(character.name);
    expect(characterImage).toBeInTheDocument();
  });

  test('renders "No description available" when description is not provided', () => {
    const characterWithoutDescription = {
      ...character,
      description: '', // it has to be an empty string because description is required in PropTypes, i can't pass undefined or null
    };
    render(<CharacterDetail character={characterWithoutDescription} />);
    expect(screen.getByText('No description available')).toBeInTheDocument();
  });
});
