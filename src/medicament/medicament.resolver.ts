import { Mutation, Query, Resolver, Args, Int } from '@nestjs/graphql';
import { MedicamentService } from './medicament.service';
import { Medicament } from './medicament.model';
import { CreateMedicamentInput } from "./dto/create-medicament.input";
import { UpdateMedicamentInput } from "./dto/update-medicament.input";

@Resolver(of => Medicament)
export class MedicamentResolver{
    constructor(private readonly medicamentService: MedicamentService){}

    @Query(returns => [Medicament])
    async Medicaments(): Promise <Medicament[]>{
        return this.medicamentService.findAll();
    }

    @Query(returns => Medicament)
    async medicament(@Args('id', { type: () => Int }) id: number): Promise<Medicament>{
        return this.medicamentService.findOne(id);
    }

    @Mutation(returns => Medicament)
    async createMedicament(@Args('createMedicamentInput') createMedicamentInput: CreateMedicamentInput): Promise<Medicament> {
      return this.medicamentService.create(createMedicamentInput);
    }
  
    @Mutation(returns => Medicament)
    async updateMedicament(@Args('updateMedicamentInput') updateMedicamentInput: UpdateMedicamentInput): Promise<Medicament> {
      return this.medicamentService.update(updateMedicamentInput.id, updateMedicamentInput);
    }
  

    @Mutation(returns => Boolean)
    async deleteMedicament(@Args('id', { type: ()=> Int }) id: number): Promise<boolean>{
        return this.medicamentService.delete(id);
    }
}