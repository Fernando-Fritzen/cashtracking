import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const UpdatePasswordSchema = extendApi(
  z.object({
    old_password: z.string(),
    new_password: z.string(),
  }),
);

export class UpdatePasswordDTO extends createZodDto(UpdatePasswordSchema) {}
