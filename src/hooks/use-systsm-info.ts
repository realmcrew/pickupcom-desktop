import { useEffect } from 'react';
import { getSystemInfo } from '@/services/system/get-system';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSavePcSpec } from '@/hooks/use-save-pc-spec';

export const useSystemInfo = () => {
  const { data, isFetching, refetch } = useSuspenseQuery({
    queryKey: ['systemInfo'],
    queryFn: getSystemInfo,
  });

  const pcSpecMutation = useSavePcSpec();

  useEffect(() => {
    if (data) {
      pcSpecMutation.mutate({ pcIdentifier: data.pcIdentifier, pc: data.pc });
    }
  }, [data]);

  return { data, isFetching, refetch };
};
