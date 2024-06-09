import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { join } from 'path';
import * as dotenv from 'dotenv';


import { AuthModule } from './auth/auth.module';
import { DogModule } from './dog/dog.module';
import { Dog } from './dog/dog.model';
import { Medicament } from './medicament/medicament.model';
import { DogMedicament } from './dogMedicament/dogMedicament.model';
import { UserModule } from './users/user.module';
import { User } from './users/user.model';
import { MedicamentModule } from './medicament/medicament.module';
import { JwtMiddleware } from './middleware/jwt.middleware';


dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'prueba',
      autoLoadModels: true,
      synchronize: true,
      models: [User, Dog, Medicament, DogMedicament],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      csrfPrevention: false,
      context: ({ req }) => ({ user: req['user'] }),
    }),
    AuthModule,
    DogModule,
    MedicamentModule,
    DogMedicament,
    UserModule,
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
