import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infra/prisma/prisma.service';
import { RegisterUserDTO } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create({ name, last_name, email, password }: RegisterUserDTO) {
    const user = await this.prisma.user.create({
      data: {
        name,
        last_name,
        email,
        password,
      },
    });

    return user;
  }
}
