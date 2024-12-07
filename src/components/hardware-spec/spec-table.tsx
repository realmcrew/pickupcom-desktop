import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from '@/components/ui/table';
import { IComputer } from '@/types/api/dto/computer';

type Props = { computer: IComputer };

export function HardwarePanel({ computer }: Props) {
  const { cpus, motherboards, gpus, rams, disks } = computer;
  return (
    <div className="flex flex-col h-screen">
      <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <div className="lg:hidden">
          <Package2Icon className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Hardware Information</h1>
        </div>
        <div className="border shadow-sm rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Hardware</TableHead>
                <TableHead className="max-w-[150px]">Name</TableHead>
                <TableHead className="hidden md:table-cell">Vendor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/*** CPU ***/}
              {cpus.map((cpu, idx) => createRow(cpu, idx))}

              {/*** Motherboard ***/}
              {motherboards.map((motherboard, idx) => createRow(motherboard, idx))}

              {/*** GPU ***/}
              {gpus.map((gpu, idx) => createRow(gpu, idx))}

              {/*** RAM ***/}
              {rams.map((ram, idx) => createRow(ram, idx))}

              {/*** Disks ***/}
              {disks.map((disk, idx) => createRow(disk, idx))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}

function Package2Icon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></svg>
  );
}

function createRow(hardware: IHardware, key?: string | number) {
  return (
    <TableRow key={key}>
      <TableCell>{hardware.type}</TableCell>
      <TableCell className="font-medium">{hardware.displayName}</TableCell>
      <TableCell className="hidden md:table-cell">{hardware.vendorName}</TableCell>
    </TableRow>
  );
}
