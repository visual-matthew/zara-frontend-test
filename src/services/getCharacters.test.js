import api from '@/lib/api';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { getCachedData, setCachedData } from '@/lib/cache';
import { getCharacters } from './getCharacters';

vi.mock('@/lib/api');
vi.mock('@/lib/cache');

const search = 'spider';

describe('getCharacters', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should retrieve characters from the API', async () => {
    const mockData = { data: { results: [{ id: 1, name: 'Spider-Man' }] } };
    api.get.mockResolvedValueOnce({ data: mockData });

    const result = await getCharacters(search);

    expect(api.get).toHaveBeenCalledWith('/characters', {
      params: {
        limit: 50,
        nameStartsWith: search,
      },
    });
    expect(setCachedData).toHaveBeenCalledWith('characterListCache', 'spider', mockData);
    expect(result).toEqual(mockData);
  });

  test('should retrieve characters from the cache', async () => {
    const mockData = { data: { results: [{ id: 1, name: 'Spider-Man' }] } };
    getCachedData.mockReturnValueOnce(mockData);

    const result = await getCharacters(search);

    expect(api.get).not.toHaveBeenCalled();
    expect(setCachedData).not.toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });
});
