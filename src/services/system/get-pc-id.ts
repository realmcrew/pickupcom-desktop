import { uuid } from '@/shared/helpers/uuid';
import { StoreService } from '@/services/tauri/store';

export const UNIQUE_PC_ID_KEY = 'unique-pc-id';

export async function getPcIdFromStore(): Promise<string> {
  const store = StoreService.getInstance();
  const pcId = await store.get<string>(UNIQUE_PC_ID_KEY);

  if (!pcId) {
    const newPcId = uuid();
    await store.set(UNIQUE_PC_ID_KEY, newPcId);
    return newPcId;
  }

  return pcId;
}
