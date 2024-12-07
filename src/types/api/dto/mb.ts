import { IHardware } from './common';

export type IMotherboard = IHardware & {
  chipset: string;
};
