import { act, renderHook } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';
import { beforeEach, describe, expect, test } from 'vitest';

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('should return initial value if no value is stored in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    expect(result.current[0]).toBe('initialValue');
  });

  test('should return stored value if value is stored in localStorage', () => {
    window.localStorage.setItem('testKey', JSON.stringify('storedValue'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    expect(result.current[0]).toBe('storedValue');
  });

  test('should update stored value when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    act(() => {
      result.current[1]('newValue');
    });
    expect(window.localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
  });

  test('should not throw an error if localStorage is not available', () => {
    Object.defineProperty(window, 'localStorage', { value: undefined });
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    expect(result.current[0]).toBe('initialValue');
  });
});
