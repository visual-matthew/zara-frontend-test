import { renderHook, waitFor } from '@testing-library/react';
import { getCharacters } from '@/services/getCharacters';
import useCharacters from './useCharacters';
import { describe, expect, test, afterEach, vi } from 'vitest';

vi.mock('@/services/getCharacters');

const mockContext = {
  characters: [],
  setCharacters: vi.fn(),
  showFavoriteList: false,
  favoriteCharacters: {},
  setFavoriteSearchFilter: vi.fn(),
  setIsLoading: vi.fn(),
  debouncedSearch: '',
};

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => mockContext,
  };
});

describe('useCharacters', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('filters favorite characters when showFavoriteList is true', async () => {
    mockContext.showFavoriteList = true;
    mockContext.favoriteCharacters = {
      1: { id: '1', name: 'Spider-Man' },
      2: { id: '2', name: 'Iron Man' },
    };
    mockContext.debouncedSearch = 'Spider-Man';

    renderHook(() => useCharacters());
    expect(mockContext.setIsLoading).toHaveBeenCalledWith(true);
    expect(mockContext.setFavoriteSearchFilter).toHaveBeenCalledWith([{ id: '1', name: 'Spider-Man' }]);
  });

  test('sets error state when fetching characters fails', async () => {
    const mockError = new Error('Failed to fetch characters');
    getCharacters.mockRejectedValue(mockError);

    renderHook(() => useCharacters());
    await waitFor(() => {
      expect(mockContext.setIsLoading).toHaveBeenCalledWith(true);
    });
    await waitFor(() => {
      expect(mockContext.setIsLoading).toHaveBeenCalledWith(false);
    });
  });
});
