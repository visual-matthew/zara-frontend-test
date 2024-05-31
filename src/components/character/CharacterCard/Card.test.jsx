import { render, screen } from '@testing-library/react';
import Card from './Card';
import { describe, expect, test, vi } from 'vitest';

vi.mock('react-router-dom');

vi.mock('@/components/favorite/AddToFavorite/AddToFavorite', () => ({
  default: vi.fn(),
}));

const mockContext = {
  favoriteCharacters: {},
};

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => mockContext,
  };
});

describe('Card', () => {
  const character = { id: 1, name: 'Comic 1', thumbnail: { path: 'path', extension: 'jpg' } };

  test('renders character name', () => {
    render(<Card character={character} />);
    const characterName = screen.getByText(character.name);
    expect(characterName).toBeInTheDocument();
  });
});
