import * as shell from '@tauri-apps/plugin-shell';
import { useMutation } from '@tanstack/react-query';
import { Computer } from '@/types/api/dto/computer';
import { ESTIMATE_HOME_PAGE_URL } from '@/constants/url';
import { encodePcSpecToBase64 } from '@/services/estimate/encode';

export const useEstimate = () => {
  return useMutation({
    mutationFn: async (pcSpec: Computer) => encodePcSpecToBase64(pcSpec),
    onSuccess: async (encoded) => {
      console.log('[UseEstimate Success]');
      const endpoint = new URL(ESTIMATE_HOME_PAGE_URL);
      endpoint.searchParams.set('spec', encoded);

      console.log('[Endpoing]', endpoint.href);
      // Open the estimate page in the default browser
      return await shell.open(endpoint.href);
    },
    onError: (error) => {
      console.error(`[UseEstimate Error]`, error);
      throw error;
    },
  });
};
