import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const RegisterUserSchema = extendApi(
  z.object({
    name: z.string().describe('Name do mal'),
    last_name: z.string(),
    email: z.string().email('Digite um e-mail válido'),
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).*$/,
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
      ),
  }),
);

export class RegisterUserDTO extends createZodDto(RegisterUserSchema) {}
