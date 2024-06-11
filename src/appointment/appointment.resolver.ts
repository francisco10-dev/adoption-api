import {Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.model';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/middleware/jwt-auth.guard';

@Resolver(of => Appointment)
export class AppointmentResolver {
    constructor(private readonly appointmentService:  AppointmentService){}

    @Query(returns => [Appointment])
    @UseGuards(JwtAuthGuard)
    async appointments(): Promise<Appointment[]> {
        return this.appointmentService.findAll();
    }

    @Query(returns => Appointment)
    @UseGuards(JwtAuthGuard)
    async appointment(@Args('id', { type: () => String }) id: string): Promise<Appointment> {
        return this.appointmentService.getById(id);
    }

    @Mutation(returns => Appointment)
    async createAppointment(@Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput): Promise<Appointment> {
        const created = await this.appointmentService.create(createAppointmentInput);
        return created;
    }

    @Mutation(returns => Appointment)
    async updateAppointment(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput): Promise<Appointment> {
        return this.appointmentService.update(updateAppointmentInput.id, updateAppointmentInput);
    }

    @Mutation(returns => Boolean)
    async deleteAppointment(@Args('id', { type: () => String }) id: string): Promise<boolean> {
        return this.appointmentService.remove(id);
    }
}