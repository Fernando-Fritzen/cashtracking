import { JwtModuleOptions } from '@nestjs/jwt';

const jwtConfig: JwtModuleOptions = {
  global: true,
  secret: process.env.JWT_KEY,
  signOptions: { expiresIn: '1d' },
};

export default jwtConfig;
