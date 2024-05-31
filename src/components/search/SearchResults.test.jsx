import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import SearchResults from './SearchResults';
import AppContext from '@/lib/context';

describe('SearchResults', () => {
  test('displays the correct number of results when showFavoriteList is false', () => {
    render(
      <AppContext.Provider value={{ characters: [], showFavoriteList: false, favoriteSearchFilter: [] }}>
        <SearchResults />
      </AppContext.Provider>,
    );
    expect(screen.getByText('0 Results')).toBeInTheDocument();
  });

  test('displays the correct number of results when showFavoriteList is true', () => {
    render(
      <AppContext.Provider
        value={{
          characters: [],
          showFavoriteList: true,
          favoriteSearchFilter: ['Spider-Man', 'Thor', 'Captain America'],
        }}
      >
        <SearchResults />
      </AppContext.Provider>,
    );
    expect(screen.getByText('3 Results')).toBeInTheDocument();
  });
});
