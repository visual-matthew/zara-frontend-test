import { getCharacterComicsById } from './getComicsByCharacter';
import { afterEach, describe, expect, test, vi } from 'vitest';
import api from '@/lib/api';
import { getCachedData, setCachedData } from '@/lib/cache';

describe('getCharacterComicsById', () => {
  vi.mock('@/lib/api');
  vi.mock('@/lib/cache');

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should retrieve comics from the API', async () => {
    const comics = [{ id: '1', title: 'Comic 1' }];
    api.get.mockResolvedValueOnce({ data: { data: { results: comics } } });

    const result = await getCharacterComicsById('1');

    expect(api.get).toHaveBeenCalledWith('/characters/1/comics', {
      params: {
        orderBy: '-onsaleDate',
        limit: 20,
      },
    });
    expect(setCachedData).toHaveBeenCalledWith('characterComicsCache', '1', comics);
    expect(result).toEqual(comics);
  });

  test('should retrieve comics from the cache', async () => {
    const comics = [{ id: '1', title: 'Spider-Man' }];
    getCachedData.mockReturnValueOnce(comics);

    const result = await getCharacterComicsById('1');

    expect(api.get).not.toHaveBeenCalled();
    expect(setCachedData).not.toHaveBeenCalled();
    expect(result).toEqual(comics);
  });

  test('should throw an error when the API returns an error', async () => {
    api.get.mockRejectedValueOnce(new Error('API error'));
    await expect(getCharacterComicsById('1')).rejects.toThrow('An error occurred while fetching comics');
  });
});
