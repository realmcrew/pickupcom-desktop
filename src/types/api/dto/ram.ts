import { IHardware } from './common';
import { MEMORY_TYPE } from '@/constants/ram';

export type RamPlatform = 'desktop' | 'laptop';

export type RamDDRType = keyof typeof MEMORY_TYPE;

export type IRam = IHardware & {
  platform: RamPlatform;
  ddrType: RamDDRType;
};
