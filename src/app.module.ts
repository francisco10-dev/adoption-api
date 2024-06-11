import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import * as dotenv from 'dotenv';

import { AuthModule } from './auth/auth.module';
import { DogModule } from './dog/dog.module';
import { DogMedicament } from './dogMedicament/dogMedicament.model';
import { UserModule } from './users/user.module';
import { MedicamentModule } from './medicament/medicament.module';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { AppointmentModule } from './appointment/appointment.module';
import { dbConfig } from 'db';
import { graphqlConfig } from 'graphql.config';

dotenv.config();

@Module({
  imports: [dbConfig, graphqlConfig,
    AuthModule,
    DogModule,
    MedicamentModule,
    DogMedicament,
    UserModule,
    AppointmentModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 5 }))
      .forRoutes('graphql');
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
