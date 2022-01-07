import { useState, useEffect } from 'react';

function getLocalStorageOrDefault(key, defaultValue, stubbedLocalStorage = null) {
  let localLocalStorage = stubbedLocalStorage || localStorage
  const stored = localLocalStorage.getItem(key);
  console.log('stored', stored);
  if (!stored) {
    return defaultValue;
  } else {
    return JSON.parse(stored);
  }
}

export function useLocalStorage(key, defaultValue, stubbedLocalStorage = null) {
  
  let localLocalStorage = stubbedLocalStorage || localStorage

  const [value, setValue] = useState(
    getLocalStorageOrDefault(key, defaultValue, stubbedLocalStorage)
  );

  useEffect(() => {
    localLocalStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
