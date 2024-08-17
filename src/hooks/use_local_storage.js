import { useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

export function useLocalStorage(key, defaultValue) {
  const storageAvailable = localStorageAvailable();

  const [value, setValue] = useState(() => {
    const storedValue = storageAvailable ? localStorage.getItem(key) : null;

    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    const listener = (e) => {
      const newValue = localStorage.getItem(key);
      setValue(newValue);
    };
    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = useCallback(
    (newValue) => {
      setValue((currentValue) => {
        const result = typeof newValue === 'function' ? newValue(currentValue) : newValue;

        if (storageAvailable) {
          localStorage.setItem(key, JSON.stringify(result));
        }

        return result;
      });
    },
    [storageAvailable, key],
  );

  return [value, setValueInLocalStorage];
}

function localStorageAvailable() {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__';
    localStorage.setItem(key, key);
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
}
