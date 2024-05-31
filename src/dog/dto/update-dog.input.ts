import { InputType, Field, PartialType, Int } from "@nestjs/graphql";
import { CreateDogInput } from "./create-dog.input";

@InputType()
export class UpdateDogInput extends PartialType(CreateDogInput){
    @Field(()=> Int)
    id: number;
}