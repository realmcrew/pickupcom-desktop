import { getSystemInfo } from '@/services/system/get-system';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useSystemInfo = () => {
  return useSuspenseQuery({
    queryKey: ['systemInfo'],
    queryFn: getSystemInfo,
  });
};
