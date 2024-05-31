import { Module } from "@nestjs/common";
import { DogService } from "./dog.service";
import { DogResolver } from "./dog.resolver";
import { SequelizeModule } from "@nestjs/sequelize";
import { Dog } from "./dog.model";

@Module({
    imports: [SequelizeModule.forFeature([Dog])],
    providers: [DogService, DogResolver],
    exports: [DogService]
})
export class DogModule{}
