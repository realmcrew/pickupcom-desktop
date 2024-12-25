import { useJsonSearchParams } from '@/lib/nuqs/json-search-params';
import { ComputerSchema } from '@/lib/zod/schemas/hardware';

export const PC_SPEC_SEARCH_PARAM_KEY = 'spec';

export const usePcSearchParams = () => {
  const [spec, setSpec] = useJsonSearchParams(PC_SPEC_SEARCH_PARAM_KEY, ComputerSchema);
  console.log(`[SPEC:]`, spec);
  return [spec, setSpec] as const;
};
