import { LocalStorageService } from "@/services/store/local-storage.service";
import { useState } from "react";

const isClient = () => typeof window !== "undefined";
const isServer = () => !isClient();

export function useLocalStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    if (isServer()) return initialValue;
    return LocalStorageService.get(key) || initialValue;
  });

  const setValue = (value: string | ((val: string) => string)) => {
    if (isServer()) return;
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    LocalStorageService.save(key, valueToStore);
  };

  return [storedValue, setValue] as const;
}
