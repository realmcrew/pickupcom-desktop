import { GPU_VENDOR_NAME_TABLE } from '@/constants/gpu';
import { IGpu } from '@/types/api/dto/gpu';
import { ISystemInfo } from '@/types/system/dto/system';

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

export function formatGpuVendor(sourceName: string): string {
  const vendor =
    GPU_VENDOR_NAME_TABLE.find((vendor) => sourceName.toLowerCase().includes(vendor.toLowerCase())) ?? sourceName;

  return vendor;
}

export function transformGpus(dto: ISystemInfo): IGpu[] {
  if (dto.os_type === 'Darwin') {
    return [
      {
        type: 'GPU',
        hwKey: `${dto.system.gpu.brand} / ${dto.system.gpu.core_count} Core`,
        displayName: `${dto.system.gpu.brand} / ${dto.system.gpu.core_count} Core`,
        vendorName: dto.system.gpu.vendor_id,
        chipset: `${dto.system.gpu.brand} / ${dto.system.gpu.core_count} Core`,
        subVendorName: null,
        isBuiltIn: true,
      },
    ];
  }

  if (dto.os_type === 'Windows') {
    return dto.system.gpu.map((gpu) => ({
      type: 'GPU',
      hwKey: gpu.Caption,
      displayName: `${gpu.Caption} ${gpu.AdapterRAM ?? ''}`, // Todo: Check display name
      vendorName: formatGpuVendor(gpu.AdapterCompatibility),
      chipset: gpu.VideoProcessor,
      subVendorName: null,
      isBuiltIn: isBuiltInVga(gpu.AdapterDacType),
    }));
  }

  // Unknown OS
  return [];
}
