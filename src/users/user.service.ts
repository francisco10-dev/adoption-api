import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(createUsuarioInput: CreateUserInput): Promise<User> {
    const user = new User();
    user.name = createUsuarioInput.name;
    user.email = createUsuarioInput.email;
    user.phone = createUsuarioInput.phone;
    user.address = createUsuarioInput.address;
    user.role = createUsuarioInput.role;
    user.password =  bcrypt.hashSync(createUsuarioInput.password, 10);
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async getByEmail(email: string): Promise<User>{
    const user = this.userModel.findOne({ where: { email: email } });
    if(user){
      return user;
    }
    return null;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async update(id: number, updateUsuarioInput: UpdateUserInput): Promise<User> {
    const user = await this.findOne(id);
    await user.update(updateUsuarioInput);
    return user;
  }

  async remove(id: number): Promise<boolean> {
    const user = await this.findOne(id);
    await user.destroy();
    return true;
  }
}
