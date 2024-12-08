import { IComputer } from '@/types/api/dto/computer';
import EstimateButton from '@/components/estimate/estimate-button';
import SystemRefreshButton from '@/components/hardware-spec/system-refresh-button';
import UtilityDropdownMenu from '@/components/hardware-spec/utility-dropdown-menu';
import { cn } from '@/lib/utils';

type Props = {
  computer: IComputer;
  isSystemFetching: boolean;
  handleSystemRefresh: () => void;
  className?: string;
};

export default function SystemInfoButtonGroup({ computer, isSystemFetching, handleSystemRefresh, className }: Props) {
  return (
    <section className={cn('w-full flex justify-center', className)}>
      <div className="flex flex-col space-y-4 w-1/2">
        <EstimateButton computer={computer} />
        <SystemRefreshButton disabled={isSystemFetching} onClick={handleSystemRefresh} />
        <UtilityDropdownMenu />
      </div>
    </section>
  );
}
