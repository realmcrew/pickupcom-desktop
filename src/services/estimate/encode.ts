import { IComputer } from '@/types/api/dto/computer';

export function encodePcSpecToBase64(pcSpec: IComputer): string {
  const serialized = JSON.stringify(pcSpec);
  return btoa(serialized);
}
