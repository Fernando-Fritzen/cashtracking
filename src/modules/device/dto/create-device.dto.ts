import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const CreateDeviceSchema = z.object({
  name: z.string(),
  token: z.string(),
  user_id: z.string(),
});

export class CreateDeviceDTO extends createZodDto(CreateDeviceSchema) {}
