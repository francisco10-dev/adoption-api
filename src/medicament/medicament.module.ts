import { Module } from "@nestjs/common";
import { MedicamentService } from "./medicament.service";
import { MedicamentResolver } from "./medicament.resolver";
import { SequelizeModule } from "@nestjs/sequelize";
import { Medicament } from "./medicament.model";
import { Dog } from '../dog/dog.model';
import { DogMedicament } from "src/dogMedicament/dogMedicament.model";

@Module({
    imports: [SequelizeModule.forFeature([Dog, Medicament, DogMedicament])],
    providers: [MedicamentService, MedicamentResolver],
    exports: [MedicamentService]
})
export class MedicamentModule{}
