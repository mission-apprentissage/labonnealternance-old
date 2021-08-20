import { useState, useEffect } from 'react';

function getSessionStorageOrDefault(key, defaultValue) {
  const stored = sessionStorage.getItem(key);
  console.log('stored', stored);
  if (!stored) {
    console.log('return defaultValue which is', defaultValue);
    return defaultValue;
  }
  console.log('return actually stored, which is', stored);
  return JSON.parse(stored);
}

export function useSessionStorage(key, defaultValue) {
  console.log('defaultValue', defaultValue)
  const [value, setValue] = useState(
    getSessionStorageOrDefault(key, defaultValue)
  );

  useEffect(() => {
    console.log('value', value);
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  console.log('final value', value);
  return [value, setValue];
}
