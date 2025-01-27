import { useEffect } from 'react';
import { getSystemInfo } from '@/services/system/get-system';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSavePcSpec } from '@/hooks/use-save-pc-spec';
import { captureException } from '@/lib/error-monitoring/sentry';

export const useSystemInfo = () => {
  const { data, isFetching, refetch, error } = useSuspenseQuery({
    queryKey: ['systemInfo'],
    queryFn: getSystemInfo,
  });

  const pcSpecMutation = useSavePcSpec();

  useEffect(() => {
    if (error) {
      captureException(error);
      return;
    }

    if (data.pc) {
      pcSpecMutation.mutate({ pcIdentifier: data.pcIdentifier, pc: data.pc });
    }
  }, [data]);

  return { data, isFetching, refetch };
};
