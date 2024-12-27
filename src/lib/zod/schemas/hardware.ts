import { z } from 'zod';
import { Hardware } from '@/types/api/dto/common';
import { Computer } from '@/types/api/dto/computer';
import { OperatingSystem } from '@/types/api/dto/os';
import { Cpu } from '@/types/api/dto/cpu';
import { Gpu } from '@/types/api/dto/gpu';
import { Mainboard } from '@/types/api/dto/mb';
import { Disk } from '@/types/api/dto/disk';
import { Ram } from '@/types/api/dto/ram';

export const HardwareSchema = z.object({
  hwKey: z.string(),
  vendorName: z.string(),
  displayName: z.string(),
  type: z.union([
    z.literal('CPU'),
    z.literal('GPU'),
    z.literal('RAM'),
    z.literal('MB'),
    z.literal('DISK'),
    z.literal('OTHER'),
  ]),
  rawData: z.record(z.any()).nullable(),
}) satisfies z.ZodType<Hardware>;

export const CpuSchema = HardwareSchema.extend({
  coreCount: z.number().nullable(),
  threadCount: z.number().nullable(),
  baseClock: z.number().nullable(),
  boostClock: z.number().nullable(),
}) satisfies z.ZodType<Cpu>;

export const GpuSchema = HardwareSchema.extend({
  chipset: z.string(),
  subVendorName: z.string().nullable(),
  isBuiltIn: z.boolean(),
  vramCapacity: z.number(),
  vramCapacityUnit: z.string(),
}) satisfies z.ZodType<Gpu>;

export const MainboardSchema = HardwareSchema.extend({
  chipset: z.string(),
}) satisfies z.ZodType<Mainboard>;

export const DiskSchema = HardwareSchema.extend({
  kind: z.string(),
  capacity: z.number(),
  capacityUnit: z.union([z.literal('B'), z.literal('KB'), z.literal('MB'), z.literal('GB'), z.literal('TB')]),
}) satisfies z.ZodType<Disk>;

export const RamSchema = HardwareSchema.extend({
  platform: z.union([z.literal('desktop'), z.literal('laptop')]),
  ddrType: z.union([z.literal('DDR1'), z.literal('DDR2'), z.literal('DDR3'), z.literal('DDR4'), z.literal('DDR5')]),
  capacity: z.number(),
  capacityUnit: z.string(),
}) satisfies z.ZodType<Ram>;

export const OsSchema = z.object({
  name: z.string(),
  platform: z.enum(['desktop', 'laptop']),
}) satisfies z.ZodType<OperatingSystem>;

export const ComputerSchema = z.object({
  os: OsSchema,
  cpus: CpuSchema.array(),
  gpus: GpuSchema.array(),
  rams: RamSchema.array(),
  mainboards: MainboardSchema.array(),
  disks: DiskSchema.array(),
}) satisfies z.ZodType<Computer>;
