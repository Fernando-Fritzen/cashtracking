import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const UpdateUserSchema = extendApi(
  z.object({
    name: z.string().optional(),
    last_name: z.string().optional(),
  }),
);

export class UpdateUserDTO extends createZodDto(UpdateUserSchema) {}
