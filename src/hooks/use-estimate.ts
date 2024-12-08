import * as shell from '@tauri-apps/plugin-shell';
import { useMutation } from '@tanstack/react-query';
import { IComputer } from '@/types/api/dto/computer';
import { ESTIMATE_HOME_PAGE_URL } from '@/constants/url';
import { encodePcSpecToBase64 } from '@/services/estimate/encode';

export const useEstimate = () => {
  return useMutation({
    mutationFn: async (pcSpec: IComputer) => encodePcSpecToBase64(pcSpec),
    onSuccess: async (encoded) => {
      const endpoint = new URL(ESTIMATE_HOME_PAGE_URL);
      endpoint.searchParams.set('spec', encoded);

      // Open the estimate page in the default browser
      return await shell.open(endpoint.href);
    },
    onError: (error) => {
      console.error(error);
      throw error;
    },
  });
};
