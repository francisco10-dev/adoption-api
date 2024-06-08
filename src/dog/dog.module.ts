import { Module } from "@nestjs/common";
import { DogService } from "./dog.service";
import { DogResolver } from "./dog.resolver";
import { SequelizeModule } from "@nestjs/sequelize";
import { Dog } from "./dog.model";
import { ImageController } from "./dog.controller";

@Module({
    imports: [SequelizeModule.forFeature([Dog])],
    providers: [DogService, DogResolver],
    exports: [DogService], 
    controllers: [ImageController]
})
export class DogModule{}
