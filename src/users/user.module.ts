import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersResolver } from './user.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  providers: [UserService, UsersResolver],
  exports: [UserService],
})
export class UserModule {}
