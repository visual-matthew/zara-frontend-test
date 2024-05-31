import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import AppContext from '@/lib/context';
import { describe, expect, test, vi } from 'vitest';
import useFavoriteCharacters from '@/hooks/useFavoriteCharacters';

vi.mock('@/hooks/useFavoriteCharacters');

describe('Header', () => {
  useFavoriteCharacters.mockReturnValue({ characters: {} });

  test('renders the Marvel logo', () => {
    render(
      <AppContext.Provider value={{ setShowFavoriteList: vi.fn() }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AppContext.Provider>,
    );
    expect(screen.getByAltText('marvel logo')).toBeInTheDocument();
  });

  test('calls setShowFavoriteList when the logo is clicked', () => {
    const setShowFavoriteListMock = vi.fn();
    render(
      <AppContext.Provider value={{ setShowFavoriteList: setShowFavoriteListMock }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </AppContext.Provider>,
    );
    fireEvent.click(screen.getByAltText('marvel logo'));
    expect(setShowFavoriteListMock).toHaveBeenCalled();
  });
});
