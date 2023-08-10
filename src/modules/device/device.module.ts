import { PrismaModule } from '@infra/prisma';
import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';

@Module({
  imports: [PrismaModule],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
