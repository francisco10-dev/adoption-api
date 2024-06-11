import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Appointment } from "./appointment.model";
import { CreateAppointmentInput } from "./dto/create-appointment.input";
import { UpdateAppointmentInput } from "./dto/update-appointment.input";
import { UUID } from "sequelize";

@Injectable()
export class AppointmentService {
    constructor(
        @InjectModel(Appointment)
        private readonly appointmentModel: typeof Appointment
    ){}

    async generateId() {
        const id = UUID();
        return id;
    }

    async create(createAppointmentInput: CreateAppointmentInput): Promise<Appointment>{
        const { date, userId, dogId, comments, hour } = createAppointmentInput;
        const appointment = new this.appointmentModel({
          date,
          hour,
          userId,
          dogId,
          comments,
        });
        const created = await appointment.save();
        return await this.getById(created.id)
    }

    async findAll(): Promise<Appointment[]>{
        const data = this.appointmentModel.findAll({
            include: [{ all: true }] 
        });
        return data;
    }

    async getById(id: string): Promise<Appointment>{
        const appointment = await this.appointmentModel.findByPk(id, {
            include: [{ all: true }]
        });
        if(!appointment){
            throw new NotFoundException('Registro no encontrado');
        }
        return appointment;
    }

    async update(id: string, updateAppointmentInput: UpdateAppointmentInput): Promise<Appointment>{
        const appointment = await this.getById(id);
        if(appointment){
            appointment.update(updateAppointmentInput);
            return appointment;
        }
        return null;
    }

    async remove(id: string): Promise<boolean>{
        const appointment = await this.getById(id);
        if(appointment){
            appointment.destroy();
            return true;
        }
        return false;
    }


}