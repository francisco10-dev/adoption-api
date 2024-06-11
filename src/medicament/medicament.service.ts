import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Medicament } from "./medicament.model";
import { CreateMedicamentInput } from "./dto/create-medicament.input";
import { UpdateMedicamentInput } from "./dto/update-medicament.input";

@Injectable()
export class MedicamentService{
    constructor(
        @InjectModel(Medicament)
        private readonly medicamentModel: typeof Medicament
    ){}

    async create(createMedicamentInput: CreateMedicamentInput): Promise<Medicament> {
        const medicament = new Medicament();
        medicament.name = createMedicamentInput.name;
        medicament.supply = createMedicamentInput.supply;
        medicament.description = createMedicamentInput.description;
        medicament.cost = createMedicamentInput.cost;
        await medicament.save();
        return medicament;
    }

    async findAll(): Promise <Medicament[]>{
        return await this.medicamentModel.findAll();
    }

    async findOne(id: number): Promise <Medicament>{
        const medicament = this.medicamentModel.findByPk(id);
        if(!medicament){
            throw new NotFoundException('Registro no encontrado');
        }
        return medicament;
    }

    async update(id: number, updateMedicamentInput: UpdateMedicamentInput): Promise <Medicament>{
        const medicament = await this.findOne(id);
        await medicament.update(updateMedicamentInput);
        return medicament;
    }

    async delete(id: number): Promise<boolean> {
       const medicament = await this.findOne(id);
       await medicament.destroy();
       return true;
    }
}