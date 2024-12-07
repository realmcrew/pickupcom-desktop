import { ICpu } from './cpu';
import { IMotherboard } from './mb';
import { IGpu } from './gpu';
import { IRam } from './ram';
import { IDisk } from './disk';
import { IOperatingSystem } from './os';

export type IComputer = {
  os: IOperatingSystem;
  cpus: ICpu[];
  motherboards: IMotherboard[];
  gpus: IGpu[];
  rams: IRam[];
  disks: IDisk[];
};
