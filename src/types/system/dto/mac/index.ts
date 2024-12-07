import { IMacOs } from './os.ts';
import { IMacCpu } from './cpu.ts';
import { IMacGpu } from './gpu.ts';
import { IMacRam } from './ram.ts';
import { IMacDisk } from './disk.ts';

export type IMacSystem = {
  os: IMacOs;
  cpu: IMacCpu;
  gpu: IMacGpu;
  rams: IMacRam[];
  disks: IMacDisk[];
};
