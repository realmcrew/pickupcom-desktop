import * as shell from '@tauri-apps/plugin-shell';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

export default function UtilityDropdownMenu() {
  const CPU_Z_URL = 'https://www.cpuid.com/softwares/cpu-z.html';
  const HW_MONITOR_URL = 'https://www.cpuid.com/softwares/hwmonitor.html';

  const openBrowser = async (url: string) => {
    await shell.open(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">유틸리티 다운로드</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full" align="end">
        <DropdownMenuLabel>유틸리티 다운로드</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-blue-400" onClick={() => openBrowser(CPU_Z_URL)}>
            CPU-Z 다운로드 페이지로 이동
          </DropdownMenuItem>
          <DropdownMenuItem className="text-blue-400" onClick={() => openBrowser(HW_MONITOR_URL)}>
            HW Monitor 다운로드 페이지로 이동
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
