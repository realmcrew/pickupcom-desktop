import { ESTIMATE_HOME_PAGE_URL } from '@/constants/url';
import { useQuery } from '@tanstack/react-query';
import { PcRoomNamesResponseSchema } from '@/lib/zod/schemas/pc-room';

async function getPcRoomNames(): Promise<string[]> {
  const endpoint = new URL(`/api/pc-rooms`, ESTIMATE_HOME_PAGE_URL);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to get PC room names');
  }

  const data = await response.json();
  console.log('[RESPONSE DATA]', data);

  return PcRoomNamesResponseSchema.parse(data).processNames;
}

function checkPcRoomNames({ processNames, pcRoomNames }: { processNames: string[]; pcRoomNames: string[] }): boolean {
  return processNames.some((processName) => pcRoomNames.includes(processName));
}

export const usePcRoomNames = (processNames: string[]) => {
  return useQuery({
    queryKey: ['pc-room-names', processNames],
    queryFn: async () => {
      const pcRoomNames = await getPcRoomNames();
      return checkPcRoomNames({ processNames, pcRoomNames });
    },
    staleTime: Infinity,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
