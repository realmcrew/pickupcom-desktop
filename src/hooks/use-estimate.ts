import * as shell from '@tauri-apps/plugin-shell';
import { useMutation } from '@tanstack/react-query';
import { ESTIMATE_HOME_PAGE_URL } from '@/constants/url';

export const useEstimate = () => {
  return useMutation({
    mutationFn: async ({ pcId }: { pcId: string }) => {
      const endpoint = new URL(`/pc`, ESTIMATE_HOME_PAGE_URL);
      endpoint.searchParams.set('pcId', pcId);
      await shell.open(endpoint.href);
      return 'success' as const;
    },
    onSuccess: async (result) => {
      console.log('[UseEstimate Success]');
      console.log('[Result]', result);
      // Open the estimate page in the default browser
    },
    onError: (error) => {
      console.error(`[UseEstimate Error]`, error);
      throw error;
    },
  });
};
