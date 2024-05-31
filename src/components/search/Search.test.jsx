import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import Search from './Search';
import AppContext from '@/lib/context';
import { beforeEach, describe, expect, test, vi, afterEach } from 'vitest';

const setDebouncedSearchMock = vi.fn();
const clearTimeoutMock = vi.spyOn(globalThis, 'clearTimeout');

const providerProps = {
  characters: [],
  setCharacters: vi.fn(),
  debouncedSearch: '',
  setDebouncedSearch: setDebouncedSearchMock,
  favoriteCharacters: {},
  setFavoriteCharacters: vi.fn(),
  showFavoriteList: false,
  setShowFavoriteList: vi.fn(),
  favoriteSearchFilter: [],
  setFavoriteSearchFilter: vi.fn(),
  isLoading: false,
  setIsLoading: vi.fn(),
};

describe('Search', () => {
  beforeEach(() => {
    render(
      <AppContext.Provider value={providerProps}>
        <Search />
      </AppContext.Provider>,
    );
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('should render a search input', () => {
    expect(screen.getByPlaceholderText('Search a character...')).toBeInTheDocument();
  });

  test('should call setDebouncedSearch after typing', async () => {
    const input = screen.getByPlaceholderText('Search a character...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(input.value).toBe('test');

    await waitFor(() => expect(setDebouncedSearchMock).toHaveBeenCalledWith('test'), { timeout: 500 });
  });

  test('should clear the timeout when the component unmounts', () => {
    const { unmount } = render(
      <AppContext.Provider value={{ ...providerProps, setDebouncedSearch: setDebouncedSearchMock }}>
        <Search />
      </AppContext.Provider>,
    );
    unmount();
    expect(clearTimeoutMock).toHaveBeenCalled();
  });
});
