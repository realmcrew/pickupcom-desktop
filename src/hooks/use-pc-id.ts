import { useSuspenseQuery } from '@tanstack/react-query';
import { getPcIdFromStore, UNIQUE_PC_ID_KEY } from '@/services/system/get-pc-id';

/**
 * 데스크탑 앱 실행시, PC 고유 식별자를 생성합니다.
 * 앱 종료 이후 재실행시, 이전에 생성된 식별자를 사용합니다.
 */
export const usePcIdentifier = () => {
  return useSuspenseQuery({
    queryKey: [UNIQUE_PC_ID_KEY],
    queryFn: async () => await getPcIdFromStore(),
  });
};
