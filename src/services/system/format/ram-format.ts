import { MEMORY_TYPE } from '@/constants/ram';
import { IWindowsRam } from '@/types/system/dto/windows/ram';
import { RAM_VENDOR_NAME_TABLE } from '@/constants/ram';
import { ISystemInfo } from '@/types/system/dto/system';
import { Ram, RamDDRType } from '@/types/api/dto/ram';
import { formatBytes } from '@/services/system/format/byte';
import { IMacRam } from '@/types/system/dto/mac/ram';

function formatRamVendor(ram: IWindowsRam): string {
  const vendor =
    RAM_VENDOR_NAME_TABLE.find((vendor) => ram.Manufacturer.toLowerCase().includes(vendor.toLowerCase())) ??
    ram.Manufacturer;

  return vendor;
}

export function formatPhysicalMemoryType(ram: IWindowsRam): RamDDRType {
  switch (ram.MemoryType) {
    case MEMORY_TYPE.DDR1:
      return 'DDR1';
    case MEMORY_TYPE.DDR2:
      return 'DDR2';
    case MEMORY_TYPE.DDR3:
      return 'DDR3';
    case MEMORY_TYPE.DDR4:
      return 'DDR4';
    case MEMORY_TYPE.DDR5:
      return 'DDR5';
    default:
      throw new Error(`Unknown memory type: ${ram.MemoryType}`);
  }
}

// @TODO: LPDDR case handling
export function formatMemoryType(ram: IWindowsRam): RamDDRType {
  console.log(`FormatMemoryType: `, ram);
  if (ram.MemoryType === 0 && ram.SmbiosMemoryType === 0) {
    throw new Error('Memory type is not defined');
  }

  switch (ram.SmbiosMemoryType) {
    case MEMORY_TYPE.DDR1:
      return 'DDR1';
    case MEMORY_TYPE.DDR2:
      return 'DDR2';
    case MEMORY_TYPE.DDR3:
      return 'DDR3';
    case MEMORY_TYPE.DDR4:
      return 'DDR4';
    case MEMORY_TYPE.DDR5:
      return 'DDR5';
    default:
      return formatPhysicalMemoryType(ram);
  }
}

export function transformRams(dto: ISystemInfo): Ram[] {
  if (dto.os_type === 'Windows') {
    return dto.system.rams.map((ram) => ({
      type: 'RAM',
      hwKey: buildWindowsRamHwKey(ram),
      displayName: buildWindowsRamHwKey(ram),
      vendorName: formatRamVendor(ram),
      ddrType: formatMemoryType(ram),
      platform: 'desktop',
      rawData: ram,
      ...buildWindowsRamCapacity(ram),
    }));
  }

  if (dto.os_type === 'Darwin') {
    return dto.system.rams.map((ram) => ({
      type: 'RAM',
      hwKey: buildMacRamHwKey(ram),
      displayName: buildMacRamHwKey(ram),
      vendorName: dto.system.cpu.vendor_id,
      ddrType: 'DDR4', // Todo: replace
      platform: 'laptop',
      rawData: ram,
      ...buildMacRamCapacity(ram),
    }));
  }

  // Unknown OS
  return [];
}

function buildWindowsRamHwKey(ram: IWindowsRam): string {
  return `${formatMemoryType(ram)} / ${ram.Speed} / ${formatBytes(ram.Capacity)}`;
}

function buildWindowsRamCapacity(ram: IWindowsRam): { capacity: number; capacityUnit: string } {
  const byteString = formatBytes(ram.Capacity, { unit: 'GB', unitSeparator: ' ' });
  const [capacity, capacityUnit] = byteString.split(' ');
  return { capacity: Number(capacity ?? 0), capacityUnit: capacityUnit ?? 'GB' };
}

function buildMacRamHwKey(ram: IMacRam): string {
  return formatBytes(ram.total_memory);
}

function buildMacRamCapacity(ram: IMacRam): { capacity: number; capacityUnit: string } {
  const byteString = formatBytes(ram.total_memory, { unit: 'GB', unitSeparator: ' ' });
  const [capacity, capacityUnit] = byteString.split(' ');
  return { capacity: Number(capacity ?? 0), capacityUnit: capacityUnit ?? 'GB' };
}
