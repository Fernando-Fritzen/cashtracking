import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  NotFoundException,
  Post,
  Put,
  Req,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { AuthService } from './auth.service';
import { RegisterUserDTO } from './dto/register-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/user.service';
import { DeviceService } from '@modules/device/device.service';
import { Public } from './auth.guard';
import { User } from '@prisma/client';
import { SendRecoverPasswordDTO } from './dto/send-recover-passord.dto';
import { RecoverPasswordVerifyDTO } from './dto/verify-password.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly mailService: MailerService,
    private readonly jwtService: JwtService,
    private readonly deviceService: DeviceService,
  ) {}

  @Public()
  @Post('/register')
  async register(@Body() body: RegisterUserDTO) {
    const { name, last_name, email, password } = body;

    const hashedPassword = await hash(password, 8);

    const userExists = await this.userService.findByEmail(email);

    if (userExists) {
      throw new UnauthorizedException('Já existe um usuário com este e-mail!');
    }

    const user = await this.userService.create({
      name,
      last_name,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({
      sub: user.id,
      email,
    });

    await this.mailService.sendMail({
      to: email,
      subject: 'Seja bem vindo',
      template: 'welcome',
      context: {
        name,
        verify_url: `http://localhost:3031/auth/email/verify?token=${token}`,
        app_url: process.env.APP_URL,
      },
    });

    delete user.password;

    return user;
  }

  @Public()
  @HttpCode(200)
  @Post('/login')
  async login(@Body() body: LoginUserDTO) {
    const { email, password, device_name } = body;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Verifique seu usuário e senha.');
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Verifique seu usuário e senha.');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email,
    });

    const device = await this.deviceService.findByName(device_name, user.id);

    if (!device) {
      await this.deviceService.create({
        name: device_name,
        token,
        user_id: user.id,
      });
    } else {
      await this.deviceService.update(device.id, {
        token,
        last_login: new Date(),
      });
    }

    return {
      token,
    };
  }

  @Public()
  @HttpCode(200)
  @Post('/email/verify')
  async verifyEmail(@Body() body) {
    const { token } = body;

    try {
      const { sub } = this.jwtService.verify(token);

      const user = await this.userService.findById(sub);

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      if (user.email_verified_at) {
        throw new BadRequestException('E-mail já foi verificado!');
      }

      await this.userService.validateUser(user.id);
    } catch (error) {
      throw new UnauthorizedException('Token inválido!');
    }
  }

  @Public()
  @Post('/password/recover/send')
  async recoverPassword(@Body() body: SendRecoverPasswordDTO) {
    const { email } = body;

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('Não existe conta associada a este e-mail');
    }

    const token = await this.jwtService.signAsync(
      {
        sub: email,
      },
      {
        expiresIn: '30m',
      },
    );

    await this.userService.updateVerifyCode(user.id, token);

    await this.mailService.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      template: 'password-recover',
      context: {
        name: user.name,
        verify_url: `http://localhost:3031/auth/password/recover/verify?token=${token}`,
      },
    });

    return {
      message: 'Verifique sua caixa de entrada para continuar',
    };
  }

  @Public()
  @Post('/password/recover/verify')
  async recoverPasswordVerify(@Body() body: RecoverPasswordVerifyDTO) {
    const { token, new_password } = body;

    try {
      const { sub: email } = this.jwtService.verify(token);

      const user = await this.userService.findByEmail(email);

      if (!user || user.verification_token !== token) {
        throw new NotFoundException('Token inválido ou expirado');
      }

      const password = await hash(new_password, 8);

      await this.userService.update(user.id, {
        password,
        verification_token: null,
      });

      return {
        message: 'Senha alterado com sucesso',
      };
    } catch (error) {
      throw new BadRequestException('Token inválido ou expirado');
    }
  }

  @Get('/profile')
  async getProfile(@Request() request): Promise<User> {
    const {
      user: { sub },
    } = request;

    const user = await this.userService.findById(sub);

    delete user.password;

    return user;
  }

  @Put('/profile/update')
  async update(@Body() body: UpdateUserDTO, @Req() request) {
    const { sub: id } = request.user;
    const { name, last_name } = body;

    const user = await this.userService.findById(id);

    const data = {
      name,
      last_name,
    };

    await this.userService.update(user.id, data);

    return {
      message: 'Usuário atualizado!',
    };
  }

  @Put('/profile/update/password')
  async updatePassword(@Body() body: UpdatePasswordDTO, @Req() request) {
    const { sub: id } = request.user;
    const { old_password, new_password } = body;

    console.log(request.user);

    const user = await this.userService.findById(id);

    const passwordMatches = await compare(old_password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Senha atual incorreta');
    }

    const password = await hash(new_password, 8);

    await this.userService.update(user.id, {
      password,
    });

    return {
      message: 'Senha atualizada!',
    };
  }
}
