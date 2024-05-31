import { render, fireEvent, screen } from '@testing-library/react';
import FavoritesCounter from './FavoritesCounter';
import AppContext from '@/lib/context';
import useFavoriteCharacters from '@/hooks/useFavoriteCharacters';
import { describe, expect, test, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';

vi.mock('@/hooks/useFavoriteCharacters');

describe('FavoritesCounter', () => {
  test('renders correctly with 0 characters', () => {
    useFavoriteCharacters.mockReturnValue({ characters: {} });
    render(
      <AppContext.Provider value={{ setShowFavoriteList: vi.fn() }}>
        <BrowserRouter>
          <FavoritesCounter />
        </BrowserRouter>
      </AppContext.Provider>,
    );

    expect(screen.getByLabelText('View favorites')).toBeInTheDocument();
  });

  test('displays the correct number of characters', () => {
    const characters = {
      character1: { id: '1', name: 'Spider-Man' },
      character2: { id: '2', name: 'Iron Man' },
    };
    useFavoriteCharacters.mockReturnValue({ characters });
    render(
      <AppContext.Provider value={{ setShowFavoriteList: vi.fn() }}>
        <BrowserRouter>
          <FavoritesCounter />
        </BrowserRouter>
      </AppContext.Provider>,
    );
    const characterCount = screen.getByText('2');
    expect(characterCount).toBeInTheDocument();
  });

  test('calls setShowFavoriteList when clicked', () => {
    const setShowFavoriteListMock = vi.fn();
    useFavoriteCharacters.mockReturnValue({ characters: {} });

    render(
      <AppContext.Provider value={{ setShowFavoriteList: setShowFavoriteListMock }}>
        <BrowserRouter>
          <FavoritesCounter />
        </BrowserRouter>
      </AppContext.Provider>,
    );

    fireEvent.click(screen.getByLabelText('View favorites'));
    expect(setShowFavoriteListMock).toHaveBeenCalledTimes(1);
  });
});
