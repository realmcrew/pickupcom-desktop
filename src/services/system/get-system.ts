import { IComputer } from '@/types/api/dto/computer';
import { invokeSystemCommand } from '../tauri/invoke';
import { ISystemInfo } from '@/types/system/dto/system';
import { transformGpus } from './format/gpu-format';
import { transformRams } from './format/ram-format';
import { transformDisks } from './format/disk-format';
import { transformCpus } from './format/cpu-format';
import { transformMotherboards } from './format/mb-format';
import { WINDOWS_PLATFORM_TYPE } from '@/types/system/dto/windows/platform';

export async function getSystemInfo(): Promise<IComputer> {
  const response = await invokeSystemCommand<ISystemInfo>('get_system_info').catch((e) => {
    console.error(e);
    throw e;
  });

  return transform(response);
}

function transform(dto: ISystemInfo): IComputer {
  switch (dto.os_type) {
    case 'Darwin':
      return {
        os: { name: dto.system.os.name, platform: 'laptop' },
        cpus: transformCpus(dto),
        gpus: transformGpus(dto),
        motherboards: transformMotherboards(dto),
        rams: transformRams(dto),
        disks: transformDisks(dto),
      };

    case 'Windows':
      const platform = dto.system.platform[0].ChassisTypes[0];
      // Desktop or laptop
      const isKnownPlatform = (Object.values(WINDOWS_PLATFORM_TYPE) as number[]).includes(platform);

      if (!isKnownPlatform) {
        throw new Error(`Unknown platform type: ${platform}`);
      }

      const isDesktop = platform === WINDOWS_PLATFORM_TYPE.DESKTOP;

      return {
        os: {
          name: dto.system.os[0].Name,
          platform: isDesktop ? 'desktop' : 'laptop',
        },
        cpus: transformCpus(dto),
        motherboards: transformMotherboards(dto),
        gpus: transformGpus(dto),
        rams: transformRams(dto),
        disks: transformDisks(dto),
      };

    // case 'Linux':
    //Todo: Implement Linux
    default:
      return {
        os: { name: 'UNKNOWN', platform: 'desktop' },
        cpus: transformCpus(dto),
        motherboards: transformMotherboards(dto),
        gpus: transformGpus(dto),
        rams: transformRams(dto),
        disks: transformDisks(dto),
      };
  }
}
