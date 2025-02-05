import { useEffect } from 'react';
import { getSystemInfo } from '@/services/system/get-system';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSavePcSpec } from '@/hooks/use-save-pc-spec';
import { captureException } from '@/lib/error-monitoring/sentry';
import {
  getPcRoomManagementProcessNames,
  checkPcRoomManagementProcessNames,
} from '@/services/system/pc-room-management-process';

export const useSystemInfo = () => {
  const pcSpecMutation = useSavePcSpec();
  const systemQuery = useSuspenseQuery({
    queryKey: ['systemInfo'],
    queryFn: async () => {
      const systemInfo = await getSystemInfo();
      const pcRoomManagementProcessNames = await getPcRoomManagementProcessNames();
      const isPcRoom = checkPcRoomManagementProcessNames({
        processNames: systemInfo.processNames,
        pcRoomManagementProcessNames,
      });

      return { ...systemInfo, isPcRoom };
    },
  });

  useEffect(() => {
    if (systemQuery.error) {
      captureException(systemQuery.error);
      return;
    }

    if (systemQuery.data?.pc) {
      pcSpecMutation.mutate({ pcIdentifier: systemQuery.data.pcIdentifier, pc: systemQuery.data.pc });
    }
  }, [systemQuery.data]);

  return systemQuery;
};
