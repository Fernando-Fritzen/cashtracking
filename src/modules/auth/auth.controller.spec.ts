import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '@modules/user/user.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { DeviceService } from '@modules/device/device.service';
import { PrismaModule } from '@infra/prisma';

import { User, UserPayload } from 'prisma/prisma-client';
import { randomUUID } from 'crypto';

const fakeUser = {
  id: randomUUID(),
  name: 'John',
  last_name: 'Doe',
  email: 'john@email.com',
  password: '123456',
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        PrismaService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn().mockResolvedValue(fakeUser),
            update: jest.fn(),
            updateVerifyCode: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
            validateUser: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
        {
          provide: DeviceService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByName: jest.fn(),
            findByToken: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should create an user', async () => {
      const user = await controller.register(fakeUser);

      expect(user).toHaveProperty('id');
    });
  });
});
