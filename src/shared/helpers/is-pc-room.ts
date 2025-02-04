const PC_ROOM_PROCESS_NAMES = ['geto', '게토'];

/**
 * 현재 컴퓨터가 PC방 컴퓨터인지 확인합니다.
 */
export function isPcRoom(processNames: string[]): boolean {
  return processNames.some((name) => PC_ROOM_PROCESS_NAMES.includes(name));
}
