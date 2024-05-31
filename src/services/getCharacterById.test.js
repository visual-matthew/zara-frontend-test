import { afterEach, describe, expect, test, vi } from 'vitest';
import api from '@/lib/api';
import { getCharactersById } from './getCharacterById';
import { getCachedData, setCachedData } from '@/lib/cache';

vi.mock('@/lib/api');
vi.mock('@/lib/cache');

describe('getCharactersById', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('should retrieve character details from the API', async () => {
    const characterDetails = { id: '1', name: 'Spider-Man', description: 'His name is Peter Parker' };
    api.get.mockResolvedValueOnce({ data: { data: { results: [characterDetails] } } });

    const result = await getCharactersById('1');

    expect(api.get).toHaveBeenCalledWith('/characters/1');
    expect(setCachedData).toHaveBeenCalledWith('characterDetailsCache', '1', characterDetails);
    expect(result).toEqual(characterDetails);
  });

  test('should retrieve character details from the cache', async () => {
    const characterDetails = { id: '1', name: 'Spider-Man', description: 'His name is Peter Parker' };
    getCachedData.mockReturnValueOnce(characterDetails);

    const result = await getCharactersById('1');

    expect(api.get).not.toHaveBeenCalled();
    expect(setCachedData).not.toHaveBeenCalled();
    expect(result).toEqual(characterDetails);
  });

  test('should throw an error when character details are not found', async () => {
    api.get.mockResolvedValueOnce({ data: { data: { results: [] } } });
    await expect(getCharactersById('1')).rejects.toThrow('An error occurred while fetching the character');
  });
});
