import { InputType, Field } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';

@InputType()
export class CreateDogInput {
  @Field()
  name: string;

  @Field()
  condition: string;

  @Field()
  description: string;

  @Field()
  status: string;

  @Field(() => GraphQLUpload, { nullable: true })
  photo?: Upload;
}
