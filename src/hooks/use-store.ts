import { useEffect } from 'react';
import { StoreService } from '@/services/tauri/store';

export const useStore = () => {
  const store = StoreService.getInstance();

  useEffect(() => {
    store.initStore();
  }, []);

  return store;
};
