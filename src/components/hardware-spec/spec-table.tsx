import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Hardware } from '@/types/api/dto/common';
import { Computer } from '@/types/api/dto/computer';

type Props = { className?: string; pc: Computer };

export function HardwarePanel({ className, pc }: Props) {
  const { cpus, mainboards, gpus, rams, disks } = pc;
  return (
    <section className={cn('flex flex-col gap-4 md:gap-8', className)}>
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">내 컴퓨터 정보</h1>
      </div>
      <div className="border shadow-sm rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">타입</TableHead>
              <TableHead className="text-center">제품명</TableHead>
              <TableHead className="text-center">제조사</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/*** CPU ***/}
            {cpus.map((cpu, idx) => createRow(cpu, idx))}

            {/*** mainboard ***/}
            {mainboards.map((mainboard, idx) => createRow(mainboard, idx))}

            {/*** GPU ***/}
            {gpus.map((gpu, idx) => createRow(gpu, idx))}

            {/*** RAM ***/}
            {rams.map((ram, idx) => createRow(ram, idx))}

            {/*** Disks ***/}
            {disks.map((disk, idx) => createRow(disk, idx))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

function createRow(hardware: Hardware, key?: string | number) {
  return (
    <TableRow key={key}>
      <TableCell className="text-center">{hardware.type}</TableCell>
      <TableCell className="text-center font-medium">{hardware.displayName}</TableCell>
      <TableCell className="text-center">{hardware.vendorName}</TableCell>
    </TableRow>
  );
}
