import { fetch } from '@tauri-apps/plugin-http';
import { Computer } from '@/types/api/dto/computer';
import { useMutation } from '@tanstack/react-query';
import { env } from '@/shared/env';
import { ComputerSchema } from '@/lib/zod/schemas/hardware';

async function savePcSpec({ pcIdentifier, pc }: { pcIdentifier: string; pc: Computer }) {
  const endpoint = new URL(`/api/pc/${pcIdentifier}`, env.VITE_ESTIMATE_HOME_PAGE_URL);
  const body = ComputerSchema.parse(pc);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error('Failed to save PC spec');
  }

  const data = await response.json();
  console.log('[SAVED PC SPEC]', data);
  return pcIdentifier;
}

export const useSavePcSpec = () => {
  return useMutation({
    mutationFn: savePcSpec,
    onSuccess: (pcIdentifier) => {
      console.log('[SAVED PC ID]', pcIdentifier);
    },
    onError: (error) => {
      console.error('[PC ERROR]', error);
    },
  });
};
