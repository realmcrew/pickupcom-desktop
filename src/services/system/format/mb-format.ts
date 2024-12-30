import { MAINBOARD_SUB_VENDOR_NAME_TABLE } from '@/constants/mb';
import { Mainboard } from '@/types/api/dto/mb';
import { ISystemInfo } from '@/types/system/dto/system';
import { formatCpuBrand } from '@/services/system/format/cpu-format';

export function transformMainboards(dto: ISystemInfo): Mainboard[] {
  if (dto.os_type === 'Darwin') {
    return [];
  }

  if (dto.os_type === 'Windows') {
    return dto.system.motherboard.map((mb) => ({
      type: 'MB',
      hwKey: mb.Product,
      displayName: mb.Product ?? mb.Model ?? 'Unknown',
      vendorName: formatMotherboardVendor(mb.Manufacturer),
      chipset: mb.Product,
      rawData: mb,
      cpuVendor: formatCpuBrand(dto.system.cpu[0].Manufacturer),
    }));
  }

  // Unknown OS
  return [];
}

function formatMotherboardVendor(sourceName: string): string {
  if (!sourceName) return 'UNKNOWN';

  const vendor =
    MAINBOARD_SUB_VENDOR_NAME_TABLE.find((vendor) => sourceName.toLowerCase().includes(vendor.toLowerCase())) ??
    sourceName;

  return vendor;
}
