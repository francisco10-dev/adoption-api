import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Dog } from "./dog.model";
import { Medicament } from "src/medicament/medicament.model";
import { DogMedicament } from "src/dogMedicament/dogMedicament.model";
import { CreateDogInput } from "./dto/create-dog.input";
import { UpdateDogInput } from "./dto/update-dog.input";
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

@Injectable()
export class DogService{
    private readonly uploadDir = path.join(__dirname, '..', '..', 'uploads', 'images');
    constructor(
        @InjectModel(Dog)private readonly dogModel: typeof Dog,
        @InjectModel(Medicament) private readonly medicamentModel: typeof Medicament,
        @InjectModel(DogMedicament) private readonly dogMedicamentModel: typeof DogMedicament,
    ){
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }

    async create(createDogInput: CreateDogInput, photo?: GraphQLUpload): Promise<Dog> {
        const dog = new Dog();
        dog.name = createDogInput.name;
        dog.condition = createDogInput.condition;
        dog.description = createDogInput.description;
        dog.status = createDogInput.status;

        await dog.save();

        if (photo) {
            try {
                const photoPath = await this.saveImage(photo);
                console.log('Imagen guardada en la ruta: ', photoPath);
                dog.photo = photo.filename;
                await dog.save();
            } catch (error) {
                console.log(error);
            }
        }

        return dog;
    }

    private async saveImage(file: GraphQLUpload): Promise<string> {
        const { createReadStream, filename } = file;
        const stream = createReadStream();
        const filePath = path.join(this.uploadDir, filename);
    
        return new Promise((resolve, reject) =>
          stream
            .pipe(fs.createWriteStream(filePath))
            .on('finish', () => resolve(`/uploads/images/${filename}`))
            .on('error', reject)
        );
    }

    async findAll(): Promise <Dog[]>{
        return await this.dogModel.findAll({
            include: [Medicament]
        });
    }

    async findOne(id: number): Promise <Dog>{
        const dog = await this.dogModel.findByPk(id, {
            include: [Medicament]
        });
        if(!dog){
            throw new NotFoundException('Registro no encontrado');
        }
        return dog;
    }

    async update(id: number, updateDogInput: UpdateDogInput, photo?: GraphQLUpload): Promise <Dog>{
        const dog = await this.findOne(id);
        await dog.update(updateDogInput);

        if (photo) {
            try {
                const photoPath = await this.saveImage(photo);
                console.log('Imagen guardada en la ruta: ', photoPath);
                dog.photo = photo.filename;
                await dog.save();
            } catch (error) {
                console.log(error);
            }
        }
        return dog;
    }

    async delete(id: number): Promise<boolean> {
       const dog = await this.findOne(id);
       await dog.destroy();
       return true;
    }

    async addMedicamentsToDog(dogId: number, medicamentIds: number[]): Promise<Dog> {
        const dog = await this.findOne(dogId);
        const medicaments = await this.medicamentModel.findAll({
            where: { id: medicamentIds }
        });

        if (medicaments.length !== medicamentIds.length) {
            throw new NotFoundException('Algunos medicamentos no fueron encontrados');
        }

        await dog.$set('medicaments', medicaments);
        return this.findOne(dogId);
    }
}