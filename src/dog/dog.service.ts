import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Dog } from "./dog.model";
import { CreateDogInput } from "./dto/create-dog.input";
import { UpdateDogInput } from "./dto/update-dog.input";
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';

@Injectable()
export class DogService{
    constructor(
        @InjectModel(Dog)
        private readonly dogModel: typeof Dog
    ){}

    async create(createDogInput: CreateDogInput, photo?: GraphQLUpload): Promise<Dog> {
        const dog = new Dog();
        dog.name = createDogInput.name;
        dog.condition = createDogInput.condition;
        dog.description = createDogInput.description;
        dog.status = createDogInput.status;

        await dog.save();

        if (photo) {
            try {
                const uploadedPhoto = await this.uploadPhoto(dog.id, photo);
                console.log('RUTA => ----', uploadedPhoto);
                dog.photo = uploadedPhoto;
                await dog.save();                
            } catch (error) {
                console.log(error);
            }
        }

        return dog;
    }
    async uploadPhoto(id: number, photo: GraphQLUpload): Promise<string> {
       
        const uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        const { filename, createReadStream } = await photo;
        const filePath = path.join(uploadDir, filename);
        const relativePath = path.join('uploads', filename); 
        
        const stream = createReadStream();
        const writeStream = fs.createWriteStream(filePath);

        stream.pipe(writeStream);
        const fileBuffer = fs.readFileSync(filePath);

        const base64Image = Buffer.from(fileBuffer).toString('base64');
        return base64Image;
    }

    async findAll(): Promise <Dog[]>{
        return await this.dogModel.findAll();
    }

    async findOne(id: number): Promise <Dog>{
        const dog = this.dogModel.findByPk(id);
        if(!dog){
            throw new NotFoundException('Registro no encontrado');
        }
        return dog;
    }

    async update(id: number, updateDogInput: UpdateDogInput): Promise <Dog>{
        const dog = await this.findOne(id);
        await dog.update(updateDogInput);
        return dog;
    }

    async delete(id: number): Promise<boolean> {
       const dog = await this.findOne(id);
       await dog.destroy();
       return true;
    }
}