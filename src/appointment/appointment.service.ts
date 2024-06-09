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
        const { date, userId, dogId, comments } = createAppointmentInput;
        const appointment = new this.appointmentModel({
          date,
          userId,
          dogId,
          comments,
        });
        const app = await appointment.save();
        return app;
    }

    async findAll(): Promise<Appointment[]>{
        return this.appointmentModel.findAll();
    }

    async getById(id: string): Promise<Appointment>{
        const appointment = await this.appointmentModel.findByPk(id);
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