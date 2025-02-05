import { z } from 'zod';

export const PcRoomNamesResponseSchema = z.object({
  processNames: z
    .string({
      required_error: 'PC 방 이름은 문자열이어야 합니다.',
      invalid_type_error: 'PC 방 이름은 문자열이어야 합니다.',
    })
    .array(),
});
