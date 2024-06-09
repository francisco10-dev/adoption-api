import { Module } from "@nestjs/common";
import { AppointmentService } from "./appointment.service";
import { AppointmentResolver } from "./appointment.resolver"; 
import { SequelizeModule } from "@nestjs/sequelize";
import { Appointment } from "./appointment.model";

@Module({
    imports: [SequelizeModule.forFeature([Appointment])],
    providers: [AppointmentService, AppointmentResolver],
    exports: [AppointmentService]
})
export class AppointmentModule {}