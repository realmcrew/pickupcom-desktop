import { Computer } from '@/types/api/dto/computer';
import { invokeSystemCommand } from '@/services/tauri/invoke';
import { ISystemInfo } from '@/types/system/dto/system';
import { transformGpus } from '@/services/system/format/gpu-format';
import { transformRams } from '@/services/system/format/ram-format';
import { transformDisks } from '@/services/system/format/disk-format';
import { transformCpus } from '@/services/system/format/cpu-format';
import { transformMainboards } from '@/services/system/format/mb-format';
import { WINDOWS_PLATFORM_TYPE } from '@/types/system/dto/windows/platform';
import { getPcIdFromStore } from './get-pc-id';

/**
 * 현재 컴퓨터의 정보를 가져옵니다.
 * Rust 코드에서 컴퓨터 정보를 가져오는 함수를 호출합니다.
 */
export async function getSystemInfo(): Promise<{ pc: Computer; pcIdentifier: string }> {
  const pcIdentifier = await getPcIdFromStore();
  const response = await invokeSystemCommand<ISystemInfo>('get_system_info').catch((e) => {
    // @TODO: Error handling
    console.error(e);
    throw e;
  });
  console.log('[HW INFO]', response);

  const pc = transform(response);
  return { pc, pcIdentifier };
}

function transform(dto: ISystemInfo): Computer {
  switch (dto.os_type) {
    case 'Darwin':
      return {
        os: { name: dto.system.os.name, platform: 'laptop' },
        cpus: transformCpus(dto),
        gpus: transformGpus(dto),
        mainboards: transformMainboards(dto),
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
        mainboards: transformMainboards(dto),
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
        mainboards: transformMainboards(dto),
        gpus: transformGpus(dto),
        rams: transformRams(dto),
        disks: transformDisks(dto),
      };
  }
}
