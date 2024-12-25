import { Store, load } from '@tauri-apps/plugin-store';

const TAURI_STORE_PATH = 'store.json';

export class StoreService {
  private static instance: StoreService | null = null;
  private store: Store | null = null;

  private constructor() {}

  static getInstance(): StoreService {
    if (!StoreService.instance) {
      StoreService.instance = new StoreService();
    }
    return StoreService.instance;
  }

  async initStore(): Promise<Store> {
    if (this.store) {
      return this.store;
    }

    this.store = await load(TAURI_STORE_PATH, { autoSave: false });
    return this.store;
  }

  async set(key: string, value: unknown): Promise<void> {
    if (!this.store) {
      this.store = await this.initStore();
    }

    await this.store.set(key, value);
    await this.store.save();
  }

  async get<T>(key: string): Promise<T | undefined> {
    if (!this.store) {
      this.store = await this.initStore();
    }

    return await this.store.get<T>(key);
  }
}
