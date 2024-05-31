import api from '@/lib/api';
import { getCachedData, setCachedData } from '@/lib/cache';

export async function getCharacterComicsById(id) {
  const cachedData = getCachedData('characterComicsCache', id);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await api.get(`/characters/${id}/comics`, {
      params: {
        orderBy: '-onsaleDate',
        limit: 20,
      },
    });
    if (response.data?.data?.results) {
      setCachedData('characterComicsCache', id, response.data.data.results);
      return response.data.data.results;
    } else {
      throw new Error('Invalid response structure');
    }
  } catch (error) {
    console.error(`Error fetching comics for character ID ${id}:`, error);
    if (error.response && error.response.status === 404) {
      throw new Error('Comics not found for the given character');
    } else {
      throw new Error('An error occurred while fetching comics');
    }
  }
}
