import { GPU_VENDOR_NAME_TABLE } from '@/constants/gpu';
import { Gpu } from '@/types/api/dto/gpu';
import { ISystemInfo } from '@/types/system/dto/system';
import { IWindowsGpu } from '@/types/system/dto/windows/gpu';
import { IMacGpu } from '@/types/system/dto/mac/gpu';

export function transformGpus(dto: ISystemInfo): Gpu[] {
  if (dto.os_type === 'Darwin') {
    return [
      {
        type: 'GPU',
        hwKey: buildMacGpuHwKey(dto.system.gpu),
        displayName: buildMacGpuHwKey(dto.system.gpu),
        vendorName: dto.system.gpu.vendor_id,
        chipset: `${dto.system.gpu.brand} / ${dto.system.gpu.core_count} Core`,
        subVendorName: null,
        isBuiltIn: true,
        vramCapacity: 0,
        vramCapacityUnit: 'MB',
        rawData: dto.system.gpu,
      },
    ];
  }

  if (dto.os_type === 'Windows') {
    return dto.system.gpu.map((gpu) => ({
      type: 'GPU',
      hwKey: buildWindowsGpuHwKey(gpu),
      displayName: buildWindowsGpuHwKey(gpu),
      vendorName: formatGpuVendor(gpu.AdapterCompatibility),
      chipset: gpu.VideoProcessor,
      subVendorName: null,
      vramCapacity: gpu?.VramCapacity ?? 7272,
      vramCapacityUnit: gpu?.VRamCapacityUnit ?? 'MB',
      isBuiltIn: isBuiltInVga(gpu.AdapterDacType),
      rawData: gpu,
    }));
  }

  // Unknown OS
  return [];
}

/**
 * 내장그래픽, 외장그래픽 여부 체크
 * "AdapterDacType": "Internal DAC({number}MHz)" -> 내장그래픽
 * "AdapterDacType": "Integrated RAMDAC" -> 외장그래픽
 */
function checkBuiltInVgaType(AdapterDacType: string | null): 'built-in' | 'external' {
  if (!AdapterDacType) {
    throw new Error('AdapterDacType is null');
  }

  const isBuiltIn = AdapterDacType.toLocaleLowerCase().includes('internal');
  const isExternal = AdapterDacType.toLocaleLowerCase().includes('integrated');

  if (!isBuiltIn && !isExternal) {
    throw new Error('Unknown GPU type');
  }

  return isBuiltIn ? 'built-in' : 'external';
}

function isBuiltInVga(AdapterDacType: string | null): boolean {
  return checkBuiltInVgaType(AdapterDacType) === 'built-in';
}

function buildWindowsGpuHwKey(gpu: IWindowsGpu): string {
  return gpu.VideoProcessor;
}

function buildMacGpuHwKey(gpu: IMacGpu): string {
  return `${gpu.brand} / ${gpu.core_count} Core`;
}

function formatGpuVendor(sourceName: string): string {
  const trimmedSourceName = sourceName.trim();
  const vendor =
    GPU_VENDOR_NAME_TABLE.find((vendor) => trimmedSourceName.toLowerCase().includes(vendor.toLowerCase())) ??
    trimmedSourceName;

  return vendor;
}
