import { render, fireEvent, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import AddToFavorite from './AddToFavorite';
import useFavoriteCharacters from '@/hooks/useFavoriteCharacters';

vi.mock('@/hooks/useFavoriteCharacters');

const character = {
  id: '1',
  name: 'Spider-Man',
};

describe('AddToFavorite', () => {
  const saveCharacterMock = vi.fn();
  const removeCharacterMock = vi.fn();
  const isCharacterFavoritedMock = vi.fn();

  beforeEach(() => {
    useFavoriteCharacters.mockReturnValue({
      saveCharacter: saveCharacterMock,
      removeCharacter: removeCharacterMock,
      isCharacterFavorited: isCharacterFavoritedMock,
    });
  });

  test('renders the HeartIcon when the character is not a favorite', () => {
    isCharacterFavoritedMock.mockReturnValue(false);
    render(<AddToFavorite character={character} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toHaveClass('favorited');
  });

  test('renders the HeartedIcon when the character is a favorite', () => {
    isCharacterFavoritedMock.mockReturnValue(true);
    render(<AddToFavorite character={character} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass('favorited');
  });

  test('calls saveCharacter when button is clicked and the character is not a favorite', () => {
    isCharacterFavoritedMock.mockReturnValue(false);
    render(<AddToFavorite character={character} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(saveCharacterMock).toHaveBeenCalledWith(character);
  });

  test('calls removeCharacter when button is clicked and the character is a favorite', () => {
    isCharacterFavoritedMock.mockReturnValue(true);

    render(<AddToFavorite character={character} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(removeCharacterMock).toHaveBeenCalledWith(character.id);
  });
});
