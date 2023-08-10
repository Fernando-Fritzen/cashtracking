import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const SendRecoverPasswordSchema = extendApi(
  z.object({
    email: z.string(),
  }),
);

export class SendRecoverPasswordDTO extends createZodDto(
  SendRecoverPasswordSchema,
) {}
