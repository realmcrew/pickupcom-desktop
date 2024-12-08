import { ISystemInfo } from '@/types/system/dto/system';
import { ICpu } from '@/types/api/dto/cpu';
import { CPU_VENDOR_NAME_TABLE } from '@/constants/cpu';
import { IMacCpu } from '@/types/system/dto/mac/cpu';
import { IWindowsCpu } from '@/types/system/dto/windows/cpu';

export function transformCpus(dto: ISystemInfo): ICpu[] {
  if (dto.os_type === 'Darwin') {
    return [
      {
        type: 'CPU',
        hwKey: buildMacCpuHwKey(dto.system.cpu),
        displayName: buildMacCpuHwKey(dto.system.cpu),
        vendorName: formatCpuBrand(dto.system.cpu.vendor_id),
        coreCount: dto.system.cpu.core_count,
        threadCount: null,
        baseClock: null,
        boostClock: null,
        rawData: dto.system.cpu,
      },
    ];
  }

  if (dto.os_type === 'Windows') {
    return dto.system.cpu.map((cpu) => ({
      type: 'CPU',
      hwKey: buildWindowsCpuHwKey(cpu),
      displayName: buildWindowsCpuHwKey(cpu),
      vendorName: formatCpuBrand(cpu.Manufacturer),
      coreCount: cpu.NumberOfCores,
      threadCount: cpu.NumberOfLogicalProcessors ?? null,
      baseClock: null,
      boostClock: null,
      rawData: cpu,
    }));
  }

  // Unknown OS
  return [];
}

function buildMacCpuHwKey(cpu: IMacCpu): string {
  return `${cpu.brand} / ${cpu.core_count} Core`;
}

function buildWindowsCpuHwKey(cpu: IWindowsCpu): string {
  return cpu.Name;
}

function formatCpuBrand(sourceName: string): string {
  const vendor =
    CPU_VENDOR_NAME_TABLE.find((vendor) => sourceName.toLowerCase().includes(vendor.toLowerCase())) ?? sourceName;

  return vendor;
}
