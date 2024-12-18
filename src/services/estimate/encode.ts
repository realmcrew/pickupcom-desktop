import { Computer } from '@/types/api/dto/computer';

export function encodePcSpecToBase64(pcSpec: Computer): string {
  const sortedPcSpec: Computer = {
    os: pcSpec.os,
    cpus: pcSpec.cpus.sort((a, b) => a.hwKey.localeCompare(b.hwKey)),
    gpus: pcSpec.gpus.sort((a, b) => a.hwKey.localeCompare(b.hwKey)),
    rams: pcSpec.rams.sort((a, b) => a.hwKey.localeCompare(b.hwKey)),
    disks: pcSpec.disks.sort((a, b) => a.hwKey.localeCompare(b.hwKey)),
    mainboards: pcSpec.mainboards.sort((a, b) => a.hwKey.localeCompare(b.hwKey)),
  };
  const serialized = JSON.stringify(sortedPcSpec);
  return btoa(serialized);
}
