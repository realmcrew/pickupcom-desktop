import { IHardware } from './common';

export type IGpu = IHardware & {
  chipset: string;
  subVendorName: string | null;
  isBuiltIn: boolean;
};
