import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMedicamentInput {
  @Field()
  name: string;

  @Field()
  supply: string;

  @Field()
  description: string;
}
