const CACHE_EXPIRY_MS = 5 * 60 * 1000;

function loadCache(sessinStorageKey) {
  const cache = sessionStorage.getItem(sessinStorageKey);
  return cache ? JSON.parse(cache) : {};
}

function saveCache(sessinStorageKey, cache) {
  sessionStorage.setItem(sessinStorageKey, JSON.stringify(cache));
}

export function getCachedData(sessinStorageKey, key, timeToLive = CACHE_EXPIRY_MS) {
  const cache = loadCache(sessinStorageKey);
  const now = Date.now();
  if (cache[key] && now - cache[key].timestamp < timeToLive) {
    return cache[key].data;
  }
  return null;
}

export function setCachedData(sessinStorageKey, key, data) {
  const cache = loadCache(sessinStorageKey);
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
  saveCache(sessinStorageKey, cache);
}
