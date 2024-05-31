import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { getCachedData, setCachedData } from './cache';

const CACHE_EXPIRY_MS = 5 * 60 * 1000;

describe('cache utilities', () => {
  const localStorageKey = 'testCache';
  const testKey = 'testKey';
  const testData = { data: 'testData' };

  beforeEach(() => {
    sessionStorage.clear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('getCachedData returns null if the cache does not exist', () => {
    const data = getCachedData(localStorageKey, testKey);
    expect(data).toBeNull();
  });

  test('getCachedData returns null if the cache is expired', () => {
    const cache = { [testKey]: { data: testData, timestamp: Date.now() - CACHE_EXPIRY_MS } };
    sessionStorage.setItem(localStorageKey, JSON.stringify(cache));
    const data = getCachedData(localStorageKey, testKey);
    expect(data).toBeNull();
  });

  test('getCachedData returns data if the cache is valid', () => {
    const cache = { [testKey]: { data: testData, timestamp: Date.now() } };
    sessionStorage.setItem(localStorageKey, JSON.stringify(cache));
    const data = getCachedData(localStorageKey, testKey);
    expect(data).toEqual(testData);
  });

  test('setCachedData stores data in the cache with a timestamp', () => {
    const now = Date.now();
    setCachedData(localStorageKey, testKey, testData);
    const cache = JSON.parse(sessionStorage.getItem(localStorageKey));
    expect(cache[testKey]).toEqual({ data: testData, timestamp: now });
  });
});
