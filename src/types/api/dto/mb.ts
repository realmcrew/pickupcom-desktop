import type { Mainboard } from '@realmcrew/pickupcom/lib/shared/sdk/dto/hardware/mb';
import {
  extractIntelChipset,
  extractAMDChipset,
  normalizeMbHwKeyOrThrow,
  formatMotherboardVendor,
} from '@realmcrew/pickupcom/lib/shared/sdk/normalize';

export type { Mainboard };
export { extractIntelChipset, extractAMDChipset, normalizeMbHwKeyOrThrow, formatMotherboardVendor };
