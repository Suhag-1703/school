import { useState, useCallback } from 'react';


let globalToggleLoader: (val: boolean) => void;

export const useGlobalLoader = () => {
  const [loading, setLoading] = useState(false);

  // Expose a function that sets loader globally
  const toggleLoader = useCallback((val: boolean) => {
    setLoading(val);
  }, []);

  // Store it in a module-level variable
  globalToggleLoader = toggleLoader;

  return loading;
};

// Export the global setter for use in Axios
export const setLoaderExternally = (val: boolean) => {
  if (globalToggleLoader) {
    globalToggleLoader(val);
  }
};
