import { ISystemInfo } from '@/types/system/dto/system';
import { Cpu, formatCpuBrandOrThrow } from '@/types/api/dto/cpu';
import { IMacCpu } from '@/types/system/dto/mac/cpu';
import { IWindowsCpu } from '@/types/system/dto/windows/cpu';

export function transformCpus(dto: ISystemInfo): Cpu[] {
  if (dto.os_type === 'Darwin') {
    return [
      {
        type: 'CPU',
        hwKey: buildMacCpuHwKey(dto.system.cpu),
        displayName: buildMacCpuHwKey(dto.system.cpu),
        vendorName: formatCpuBrandOrThrow(dto.system.cpu.vendor_id),
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
      vendorName: formatCpuBrandOrThrow(cpu.Manufacturer),
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
