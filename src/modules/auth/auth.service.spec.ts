import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { User } from '@prisma/client';
import { RegisterUserDTO } from './dto/register-user.dto';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    it('It should register an user', async () => {
      const userData = {
        name: 'John',
        last_name: 'Doe',
        email: 'johndoe@email.com',
        password: '12345678',
      };

      prisma.user.create = jest.fn().mockReturnValue(userData);

      const user = await service.create(userData);

      expect(user.name).toEqual('John');
    });
  });
});
