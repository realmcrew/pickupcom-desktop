import { ISystemInfo } from '@/types/system/dto/system';
import { ICpu } from '@/types/api/dto/cpu';
import { CPU_VENDOR_NAME_TABLE } from '@/constants/cpu';
import { IMacCpu } from '@/types/system/dto/mac/cpu';
import { IWindowsCpu } from '@/types/system/dto/windows/cpu';

function formatMacCpuDisplayName(cpu: IMacCpu): string {
  return `${cpu.brand} / ${cpu.core_count} Core`;
}

function formatWindowsCpuDisplayName(cpu: IWindowsCpu): string {
  return cpu.Name;
}

export function formatCpuBrand(sourceName: string): string {
  const vendor =
    CPU_VENDOR_NAME_TABLE.find((vendor) => sourceName.toLowerCase().includes(vendor.toLowerCase())) ?? sourceName;

  return vendor;
}

export function transformCpus(dto: ISystemInfo): ICpu[] {
  if (dto.os_type === 'Darwin') {
    return [
      {
        type: 'CPU',
        hwKey: formatMacCpuDisplayName(dto.system.cpu),
        displayName: formatMacCpuDisplayName(dto.system.cpu),
        vendorName: formatCpuBrand(dto.system.cpu.vendor_id),
        coreCount: dto.system.cpu.core_count,
        threadCount: null,
        baseClock: null,
        boostClock: null,
      },
    ];
  }

  if (dto.os_type === 'Windows') {
    return dto.system.cpu.map((cpu) => ({
      type: 'CPU',
      hwKey: formatWindowsCpuDisplayName(cpu),
      displayName: formatWindowsCpuDisplayName(cpu),
      vendorName: formatCpuBrand(cpu.Manufacturer),
      coreCount: cpu.NumberOfCores,
      threadCount: cpu.NumberOfLogicalProcessors ?? null,
      baseClock: null,
      boostClock: null,
    }));
  }

  // Unknown OS
  return [];
}
