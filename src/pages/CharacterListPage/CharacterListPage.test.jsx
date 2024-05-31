import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';
import CharacterListPage from './CharacterListPage';
import useCharacters from '@/hooks/useCharacters';

const mockContext = {
  setFavoriteCharacters: vi.fn(),
  showFavoriteList: vi.fn(),
  favoriteSearchFilter: [],
  isLoading: false,
};
vi.mock('@/hooks/useCharacters');
vi.mock('@/components/character/CharacterGrid/', () => ({ default: () => <div data-testid="character-grid" /> }));

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => mockContext,
  };
});

describe('CharacterListPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test('renders the search component', () => {
    useCharacters.mockReturnValue({ characters: [], isLoading: false });

    render(<CharacterListPage />);
    screen.debug();
    expect(screen.getByPlaceholderText('Search a character...')).toBeInTheDocument();
  });

  test('renders the character grid component when not loading', () => {
    const characters = [{ id: 1, name: 'Spider-Man' }];
    useCharacters.mockReturnValue({ characters, isLoading: false });
    render(<CharacterListPage />);
    screen.debug();
    expect(screen.getByTestId('character-grid')).toBeInTheDocument();
  });
  test('renders the spinner component when loading', () => {
    useCharacters.mockReturnValue({ characters: [], isLoading: true });
    mockContext.isLoading = true;
    render(<CharacterListPage />);
    screen.debug();
    expect(screen.getByAltText('loading')).toBeInTheDocument();
  });

  test('renders the favorites title when showFavoriteList is true', () => {
    useCharacters.mockReturnValue({ characters: [], isLoading: false });
    mockContext.showFavoriteList = true;
    mockContext.favoriteSearchFilter = ['Spider-Man'];
    render(<CharacterListPage />);
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });
});
