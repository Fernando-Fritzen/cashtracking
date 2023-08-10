import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const LoginUserSchema = extendApi(
  z.object({
    email: z.string(),
    password: z.string(),
    device_name: z.string(),
  }),
);

export class LoginUserDTO extends createZodDto(LoginUserSchema) {}
