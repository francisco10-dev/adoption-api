import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'key1234',
      signOptions: { expiresIn: '7d' },
    }),
    UserModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
