import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {

  @Field()
  date: string; 

  @Field()
  hour: string; 

  @Field()
  userId: number;

  @Field()
  dogId: number;

  @Field({ nullable: true })
  comments?: string;
}
