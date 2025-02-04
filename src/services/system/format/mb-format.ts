import { formatCpuBrandOrThrow } from '@/types/api/dto/cpu';
import { extractAMDChipset, extractIntelChipset, formatMotherboardVendor, Mainboard } from '@/types/api/dto/mb';
import { ISystemInfo } from '@/types/system/dto/system';

export function transformMainboards(dto: ISystemInfo): Mainboard[] {
  if (dto.os_type === 'Darwin') {
    return [];
  }

  if (dto.os_type === 'Windows') {
    const mainboards = dto.system.motherboard.map((mb) => {
      const cpuVendor = formatCpuBrandOrThrow(dto.system.cpu[0].Manufacturer);
      const chipset = cpuVendor === 'INTEL' ? extractIntelChipset(mb.Product) : extractAMDChipset(mb.Product);
      if (!chipset) {
        console.error(`Can not extract chipset. [${mb.Product}]`);
        // throw new Error(`Can not extract chipset. [${mb.Product}]`); // @TODO: 추후 예외 처리 필요
        return null;
      }
      return {
        type: 'MB',
        hwKey: mb.Product,
        displayName: mb.Product ?? mb.Model ?? 'Unknown',
        vendorName: formatMotherboardVendor(mb.Manufacturer),
        chipset,
        rawData: mb,
        cpuVendor,
      };
    });

    return mainboards.filter((mb) => !!mb) as Mainboard[];
  }

  // Unknown OS
  return [];
}
