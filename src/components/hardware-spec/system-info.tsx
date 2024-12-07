import { useSystemInfo } from '@/hooks/use-systsm-info';
import { Button } from '@/components/ui/button';
import { HardwarePanel } from '@/components/hardware-spec/spec-table';
// import LoadingScreen from '@/components/common/loading-screen';
import EstimateButton from '@/components/estimate/estimate-button';

export default function SystemInfo() {
  const systemQuery = useSystemInfo();

  // if (systemQuery.isFetching) {
  //   return <LoadingScreen />;
  // }

  if (!systemQuery.data) {
    return <p>No data</p>;
  }

  return (
    <div>
      <HardwarePanel computer={systemQuery.data} />

      <h3>Your system info</h3>
      <p className="text-red-500">{`${JSON.stringify(systemQuery.data, null, 4)}`}</p>

      <Button
        type="button"
        disabled={systemQuery.isFetching}
        onClick={() => systemQuery.refetch()}
        className="px-4 py-2"
        variant="outline"
        size="lg"
      >
        시스템 정보 새로고침
      </Button>
      <EstimateButton computer={systemQuery.data} />
    </div>
  );
}
