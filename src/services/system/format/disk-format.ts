import { DISK_VENDOR_NAME_TABLE } from '@/constants/disk';
import { Disk } from '@/types/api/dto/disk';
import { ISystemInfo } from '@/types/system/dto/system';
import { IWindowsDisk } from '@/types/system/dto/windows/disk';
import { formatDecimalDiskSize } from '@/services/system/format/byte';
import { IMacDisk } from '@/types/system/dto/mac/disk';
import { DiskCapacityUnit } from '@kgesh/pickupcom/lib/shared/sdk/dto/disk';

export function transformDisks(dto: ISystemInfo): Disk[] {
  if (dto.os_type === 'Windows') {
    return dto.system.disks.map((disk) => {
      const diskKind = disk.DiskKind.toUpperCase();
      return {
        type: 'DISK',
        hwKey: buildWindowsDiskHwKey(disk),
        kind: diskKind,
        displayName: `${disk.Caption} / ${formatDecimalDiskSize(disk.Size)} / ${diskKind}`, // Todo: Size labeling check
        vendorName: formatDiskVendor(disk),
        rawData: disk,
        ...formatWindowsDiskCapacity(disk),
      };
    });
  }

  if (dto.os_type === 'Darwin') {
    return dto.system.disks.map((disk) => {
      const diskKind = disk.kind.toUpperCase();
      return {
        type: 'DISK',
        hwKey: buildMacDiskHwKey(disk),
        kind: diskKind,
        displayName: `${disk.name} / ${diskKind} / ${formatDecimalDiskSize(disk.total_space)}`, // Todo: Size labeling check
        vendorName: dto.system.cpu.vendor_id, // Apple
        rawData: disk,
        ...formatMacDiskCapacity(disk),
      };
    });
  }

  // Unknown OS
  return [];
}

function buildWindowsDiskHwKey(disk: IWindowsDisk): string {
  return `${disk.Caption} / ${formatDecimalDiskSize(disk.Size)}`;
}

function buildMacDiskHwKey(disk: IMacDisk): string {
  const diskKind = disk.kind.toUpperCase();
  return `${disk.name} / ${diskKind} / ${formatDecimalDiskSize(disk.total_space)}`;
}

function formatDiskVendor(disk: IWindowsDisk) {
  const vendor =
    DISK_VENDOR_NAME_TABLE.find(
      (vendor) =>
        disk.Model?.toLowerCase().includes(vendor.toLowerCase()) ||
        disk.Caption?.toLowerCase().includes(vendor.toLowerCase()),
    ) ?? 'UNKNOWN';

  return vendor;
}

function formatWindowsDiskCapacity(disk: IWindowsDisk): Pick<Disk, 'capacity' | 'capacityUnit'> {
  const formatted = formatDecimalDiskSize(disk.Size, { space: true });
  const [capacity, unit] = formatted.split(' ');

  return {
    capacity: parseInt(capacity),
    capacityUnit: unit as DiskCapacityUnit,
  };
}

function formatMacDiskCapacity(disk: IMacDisk): Pick<Disk, 'capacity' | 'capacityUnit'> {
  const formatted = formatDecimalDiskSize(disk.total_space, { space: true });
  const [capacity, unit] = formatted.split(' ');

  return {
    capacity: parseInt(capacity), // e.g., 2
    capacityUnit: unit as DiskCapacityUnit, // e.g., TB
  };
}
