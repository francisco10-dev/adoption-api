import { Module } from "@nestjs/common";
import { MedicamentService } from "./medicament.service";
import { MedicamentResolver } from "./medicament.resolver";
import { SequelizeModule } from "@nestjs/sequelize";
import { Medicament } from "./medicament.model";

@Module({
    imports: [SequelizeModule.forFeature([Medicament])],
    providers: [MedicamentService, MedicamentResolver],
    exports: [MedicamentService]
})
export class MedicamentModule{}
