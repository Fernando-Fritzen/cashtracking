import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, last_name, email, password }: Partial<User>) {
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

  async update(
    id: string,
    { name, last_name, password, verification_token }: Partial<User>,
  ): Promise<void> {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        last_name,
        password,
        verification_token,
      },
    });
  }

  async updateVerifyCode(id: string, token: string | null) {
    await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        verification_token: token,
      },
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async validateUser(id: string) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email_verified_at: new Date(),
      },
    });

    return user;
  }
}
