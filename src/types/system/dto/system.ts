import { IWindowsSystem } from './windows/index';
import { IMacSystem } from './mac/index';

const WINDOWS_OS_TYPE = 'Windows';

const MAC_OS_TYPE = 'Darwin';

export type OsType = typeof WINDOWS_OS_TYPE | typeof MAC_OS_TYPE;

export type IWindowsSystemInfo = {
  os_type: typeof WINDOWS_OS_TYPE;
  system: IWindowsSystem;
};

export type IMacSystemInfo = {
  os_type: typeof MAC_OS_TYPE;
  system: IMacSystem;
};

export type ISystemInfo = IWindowsSystemInfo | IMacSystemInfo;
