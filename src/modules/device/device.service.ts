import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { CreateDeviceDTO } from './dto/create-device.dto';
import { Device } from '@prisma/client';
import { UpdateDeviceDTO } from './dto/update-device.dto';

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, token, user_id }: CreateDeviceDTO): Promise<Device> {
    const device = await this.prisma.device.create({
      data: {
        name,
        token,
        user_id,
      },
    });

    return device;
  }

  async update(
    id: string,
    { token, last_login }: UpdateDeviceDTO,
  ): Promise<void> {
    await this.prisma.device.update({
      where: {
        id,
      },
      data: {
        token,
        last_login,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.device.delete({
      where: {
        id,
      },
    });
  }

  async findByName(name: string, user_id: string): Promise<Device> {
    const device = await this.prisma.device.findFirst({
      where: {
        name,
        user_id,
      },
    });

    return device;
  }

  async findByToken(token: string): Promise<Device> {
    // Todo - Validar id de usuário também
    const device = await this.prisma.device.findFirst({
      where: {
        token,
      },
    });

    return device;
  }
}
