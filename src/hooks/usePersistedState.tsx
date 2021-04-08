import { useEffect, useState } from "react";

export function usePersistedState(key: string, initialState: any) {
  const [state, setState] = useState(() => {
    const storagedValue = localStorage.getItem(key);

    return storagedValue ? JSON.parse(storagedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
