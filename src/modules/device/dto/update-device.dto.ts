import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

const UpdateDeviceSchema = z.object({
  token: z.string(),
  last_login: z.date(),
});

export class UpdateDeviceDTO extends createZodDto(UpdateDeviceSchema) {}
