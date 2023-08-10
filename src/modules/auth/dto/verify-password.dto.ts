import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const RecoverPasswordVerifySchema = extendApi(
  z.object({
    token: z.string(),
    new_password: z.string(),
  }),
);

export class RecoverPasswordVerifyDTO extends createZodDto(
  RecoverPasswordVerifySchema,
) {}
