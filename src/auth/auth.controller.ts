import { Controller, Post, Request, Body, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { message: 'Credenciales inválidas' };
    }
    const { access_token } = await this.authService.login(user);
    const data = {
        access_token: access_token,
        user: user.dataValues
    }
    return data;
  }

  @Get('validate-email/:email')
  async validateEmail(@Param('email') email: string ){
    const user = await this.authService.validateEmail(email);
    if(user){
        return {status: 200};
    }
    return {status: 404};
  }
}
