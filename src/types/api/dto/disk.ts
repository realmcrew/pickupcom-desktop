import { IHardware } from './common';

export type IDisk = IHardware & {
  kind: string;
  totalSpace: number;
};
