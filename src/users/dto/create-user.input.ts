import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  role: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phone: string;

  @Field()
  address: string;
}
