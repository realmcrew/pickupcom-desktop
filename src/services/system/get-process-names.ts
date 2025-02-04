import { ISystemInfo } from '@/types/system/dto/system';

/**
 * 프로세스 이름 목록을 가져옵니다.
 */
export function getProcessNames(system: ISystemInfo): string[] {
  if (system.os_type === 'Darwin') {
    return [];
  }

  return system.system?.process_names ?? [];
}
