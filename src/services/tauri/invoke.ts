import { invoke } from '@tauri-apps/api/core';

export async function invokeSystemCommand<T>(command: string, args?: Record<string, unknown>): Promise<T> {
  return await invoke<T>(command, args);
}
