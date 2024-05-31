import api from '@/lib/api';
import { getCachedData, setCachedData } from '@/lib/cache';

export async function getCharacters(search = '') {
  const cacheKey = search || '__all__';
  const cachedData = getCachedData('characterListCache', cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await api.get('/characters', {
      params: {
        limit: 50,
        nameStartsWith: search || undefined,
      },
    });

    setCachedData('characterListCache', cacheKey, response.data);

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}
