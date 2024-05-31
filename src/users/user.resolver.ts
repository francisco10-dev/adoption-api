import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/middleware/jwt-auth.guard';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [User])
  @UseGuards(JwtAuthGuard)
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(returns => User)
  @UseGuards(JwtAuthGuard)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(returns => User)
  //@UseGuards(JwtAuthGuard)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Mutation(returns => User)
  @UseGuards(JwtAuthGuard)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput): Promise<User> {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(returns => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.userService.remove(id);
  }
}
