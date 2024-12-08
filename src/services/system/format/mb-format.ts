import { MOTHERBOARD_SUB_VENDOR_NAME_TABLE } from '@/constants/mb';
import { IMotherboard } from '@/types/api/dto/mb';
import { ISystemInfo } from '@/types/system/dto/system';

export function transformMotherboards(dto: ISystemInfo): IMotherboard[] {
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
    }));
  }

  // Unknown OS
  return [];
}

function formatMotherboardVendor(sourceName: string): string {
  if (!sourceName) return 'UNKNOWN';

  const vendor =
    MOTHERBOARD_SUB_VENDOR_NAME_TABLE.find((vendor) => sourceName.toLowerCase().includes(vendor.toLowerCase())) ??
    sourceName;

  return vendor;
}
