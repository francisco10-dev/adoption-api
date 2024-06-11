import * as dotenv from 'dotenv';
import { Dog } from 'src/dog/dog.model';
import { User } from 'src/users/user.model';
import { Medicament } from 'src/medicament/medicament.model';
import { DogMedicament } from 'src/dogMedicament/dogMedicament.model';
import { Appointment } from 'src/appointment/appointment.model';
import { SequelizeModule } from '@nestjs/sequelize';

dotenv.config();

export const dbConfig = SequelizeModule.forRoot({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'prueba',
    autoLoadModels: true,
    synchronize: true,
    models: [User, Dog, Appointment, Medicament, DogMedicament],
});