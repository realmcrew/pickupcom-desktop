import { ESTIMATE_HOME_PAGE_URL } from '@/constants/url';
import { fetch } from '@tauri-apps/plugin-http';

export async function getPcRoomManagementProcessNames(): Promise<string[]> {
  const endpoint = new URL(`/api/pc-rooms`, ESTIMATE_HOME_PAGE_URL);

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to get PC room names');
  }

  const processNames = await response.json();
  console.log('[RESPONSE DATA]', processNames);

  return processNames;
}

/**
 * 현재 실행중인 프로세스 중에서
 * PC방 관리 프로세스가 있는지 확인합니다.
 */
export function checkPcRoomManagementProcessNames({
  processNames,
  pcRoomManagementProcessNames,
}: {
  processNames: string[];
  pcRoomManagementProcessNames: string[];
}): boolean {
  console.log('[PROCESS NAMES]', processNames);
  return processNames.some((processName) =>
    pcRoomManagementProcessNames.some((pcRoomManagementProcessName) =>
      processName.includes(pcRoomManagementProcessName),
    ),
  );
}
