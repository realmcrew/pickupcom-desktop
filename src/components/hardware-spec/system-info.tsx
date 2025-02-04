import { toast } from 'sonner';
import { useSystemInfo } from '@/hooks/use-systsm-info';
import { HardwarePanel } from '@/components/hardware-spec/spec-table';
import LoadingScreen from '@/components/common/loading-screen';
import RetryScreen from '@/components/common/retry-screen';
import SystemInfoButtonGroup from './system-info-button-group';
import DebugPanel from '@/components/hardware-spec/debug-panel';
import BlockScreen from '@/components/common/block-screen';
import { usePcRoomNames } from '@/hooks/use-pc-room';

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

  const validatePcRoomQuery = usePcRoomNames(systemQuery.data.processNames);
  const isPcRoom = validatePcRoomQuery.data;

  if (isPcRoom) {
    return (
      <BlockScreen
        title="PC방 컴퓨터가 감지되었습니다."
        description="PC방 컴퓨터로 매입 시도시 법적 책임을 질 수 있습니다."
      />
    );
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
