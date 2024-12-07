import { IWindowsOs } from "./os.ts";
import { IWindowsCpu } from "./cpu.ts";
import { IWindowsMotherboard } from "./mb.ts";
import { IWindowsGpu } from "./gpu.ts";
import { IWindowsRam } from "./ram.ts";
import { IWindowsDisk } from "./disk.ts";
import { IWindowsPlatform } from "./platform.ts";

export type IWindowsSystem = {
  os: IWindowsOs[];
  platform: IWindowsPlatform[];
  cpu: IWindowsCpu[];
  motherboard: IWindowsMotherboard[];
  gpu: IWindowsGpu[];
  rams: IWindowsRam[];
  disks: IWindowsDisk[];
};
