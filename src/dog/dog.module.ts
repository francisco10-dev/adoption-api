import { Module } from "@nestjs/common";
import { DogService } from "./dog.service";
import { DogResolver } from "./dog.resolver";
import { SequelizeModule } from "@nestjs/sequelize";
import { Dog } from "./dog.model";
import { ImageController } from "./dog.controller";
import { Medicament } from "src/medicament/medicament.model";
import { DogMedicament } from "src/dogMedicament/dogMedicament.model";

@Module({
    imports: [SequelizeModule.forFeature([Dog, Medicament, DogMedicament])],
    providers: [DogService, DogResolver],
    exports: [DogService], 
    controllers: [ImageController]
})
export class DogModule{}
