import { InputType, Field, PartialType, Int } from "@nestjs/graphql";
import { CreateMedicamentInput } from "./create-medicament.input";

@InputType()
export class UpdateMedicamentInput extends PartialType(CreateMedicamentInput){
    @Field(()=> Int)
    id: number;
}