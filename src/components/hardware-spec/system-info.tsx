import { toast } from 'sonner';
import { useSystemInfo } from '@/hooks/use-systsm-info';
import { HardwarePanel } from '@/components/hardware-spec/spec-table';
import LoadingScreen from '@/components/common/loading-screen';
import RetryScreen from '@/components/common/retry-screen';
import SystemInfoButtonGroup from './system-info-button-group';
import DebugPanel from '@/components/hardware-spec/debug-panel';

export default function SystemInfo() {
  const systemQuery = useSystemInfo();

  const handleSystemRefresh = () => {
    systemQuery.refetch();
    toast.success('컴퓨터 정보를 갱신합니다.', { position: 'top-center', duration: 1500, richColors: true });
  };

  if (systemQuery.isFetching) {
    return <LoadingScreen />;
  }

  if (!systemQuery.data) {
    return <RetryScreen handleRetry={handleSystemRefresh} />;
  }

  const pc = systemQuery.data.pc;

  return (
    <div className="w-full flex justify-center">
      <div className="space-y-4 max-w-4xl px-4 container mx-auto flex flex-col">
        <HardwarePanel pc={pc} />
        <SystemInfoButtonGroup isSystemFetching={systemQuery.isFetching} handleSystemRefresh={handleSystemRefresh} />
        <DebugPanel pc={pc} />
      </div>
    </div>
  );
}
