import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.model';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService, 
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateEmail(email: string): Promise<boolean>{
    const user = await this.usersService.getByEmail(email);
    if(user){
        return true;
    }
    return false;
  }

  async login(user: any)  {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
