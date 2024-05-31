import api from '@/lib/api';
import { getCachedData, setCachedData } from '@/lib/cache';

export async function getCharactersById(id) {
  const cachedData = getCachedData('characterDetailsCache', id);
  if (cachedData) {
    return cachedData;
  }
  try {
    const response = await api.get(`/characters/${id}`);
    const results = response.data.data.results;
    if (results && results.length > 0) {
      setCachedData('characterDetailsCache', id, results[0]);
      return results[0];
    } else {
      throw new Error('Character not found');
    }
  } catch (error) {
    console.error(`Error fetching character by ID ${id}: ${error.message}`);
    if (error.response && error.response.status === 404) {
      throw new Error('Character not found');
    } else {
      throw new Error('An error occurred while fetching the character');
    }
  }
}
