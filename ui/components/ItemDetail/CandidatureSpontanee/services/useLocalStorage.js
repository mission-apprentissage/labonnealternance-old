import { useState } from "react";

export default function useLocalStorage(key, initialValue) {
  
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item
  });
  
  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, value);
  };
  
  return [storedValue, setValue];
}
