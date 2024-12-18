import { Base64 } from 'js-base64';
import { Computer } from '@/types/api/dto/computer';

export function encodePcSpecToBase64(pcSpec: Computer): string {
  console.log('[ENCODED PC SPEC]', pcSpec);
  const sortedPcSpec: Computer = {
    os: pcSpec.os,
    cpus: pcSpec.cpus.sort((a, b) => a.hwKey.localeCompare(b.hwKey)),
    gpus: pcSpec.gpus.sort((a, b) => a.hwKey.localeCompare(b.hwKey)),
    rams: pcSpec.rams.sort((a, b) => a.hwKey.localeCompare(b.hwKey)),
    disks: pcSpec.disks.sort((a, b) => a.hwKey.localeCompare(b.hwKey)),
    mainboards: pcSpec.mainboards.sort((a, b) => a.hwKey.localeCompare(b.hwKey)),
  };
  const serialized = JSON.stringify(sortedPcSpec);
  console.log('[SERIALIZED]', serialized);
  const base64 = Base64.encode(serialized);
  console.log('[BASE64]', base64);
  return base64;
}
