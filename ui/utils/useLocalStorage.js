import { useState, useEffect } from 'react';

function getLocalStorageOrDefault(key, defaultValue, stubbedLocalStorage = null) {
  let localLocalStorage = stubbedLocalStorage || localStorage
  const stored = localLocalStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}

export function useLocalStorage(key, defaultValue, stubbedLocalStorage = null) {

  let localLocalStorage = stubbedLocalStorage || localStorage

  const [value, setValue] = useState(
    getLocalStorageOrDefault(key, defaultValue, stubbedLocalStorage)
  );

  // useEffect(() => {
  //   console.log('useEffect', value);
  //   localLocalStorage.setItem(key, JSON.stringify(value));
  // }, [key, value]);

  return [value, setValue];
}
