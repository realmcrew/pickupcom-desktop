import { parseAsJson, useQueryState } from 'nuqs';
import { z } from 'zod';

export const useJsonSearchParams = <T>(key: string, schema: z.ZodSchema<T>) => {
  const [json, setJson] = useQueryState(key, parseAsJson(schema.parse));
  return [json, setJson] as const;
};
