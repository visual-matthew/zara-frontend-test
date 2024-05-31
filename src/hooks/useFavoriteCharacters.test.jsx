import { renderHook, act } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import useFavoriteCharacters from './useFavoriteCharacters';
import useLocalStorage from './useLocalStorage';

vi.mock('./useLocalStorage');
const mockCharacter = { id: '1', name: 'Spider-Man' };

const mockContext = {
  favoriteCharacters: {},
  setFavoriteCharacters: vi.fn(),
};

vi.mock('react', async () => {
  const actual = await vi.importActual('react');
  return {
    ...actual,
    useContext: () => mockContext,
  };
});

describe('useFavoriteCharacters', () => {
  let setStoredCharactersMock;

  beforeEach(() => {
    setStoredCharactersMock = vi.fn();
    useLocalStorage.mockReturnValue([{}, setStoredCharactersMock]);

    mockContext.favoriteCharacters = {};
    mockContext.setFavoriteCharacters.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('initializes favoriteCharacters from localStorage', () => {
    renderHook(() => useFavoriteCharacters());
    expect(mockContext.setFavoriteCharacters).toHaveBeenCalledWith({});
  });

  test('updates localStorage when favoriteCharacters changes', () => {
    const { result } = renderHook(() => useFavoriteCharacters());

    act(() => {
      result.current.saveCharacter(mockCharacter);
    });

    expect(setStoredCharactersMock).toHaveBeenCalled();
  });

  test('saves a character to favorites', () => {
    const { result } = renderHook(() => useFavoriteCharacters());

    act(() => {
      result.current.saveCharacter(mockCharacter);
    });

    expect(mockContext.setFavoriteCharacters).toHaveBeenCalled();
  });

  test('removes a character from favorites', () => {
    const { result } = renderHook(() => useFavoriteCharacters());

    act(() => {
      result.current.saveCharacter(mockCharacter);
    });

    act(() => {
      result.current.removeCharacter(mockCharacter.id);
    });

    expect(mockContext.setFavoriteCharacters).toHaveBeenCalledWith({});
  });

  test('checks if a character is favorited', () => {
    mockContext.favoriteCharacters = {
      1: mockCharacter,
    };
    const { result } = renderHook(() => useFavoriteCharacters());

    act(() => {
      result.current.saveCharacter(mockCharacter);
    });

    const isFavorited = result.current.isCharacterFavorited('1');

    expect(isFavorited).toBe(true);
  });

  test('gets a character by ID', async () => {
    mockContext.favoriteCharacters = {
      1: mockCharacter,
    };

    const { result } = renderHook(() => useFavoriteCharacters());
    const character = result.current.getCharacter(1);
    expect(parseInt(character.id)).toEqual(1);
  });
});
