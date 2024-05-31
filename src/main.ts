import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtMiddleware } from './middleware/jwt.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(new JwtMiddleware().use);
  await app.listen(9000);
  console.log('http://localhost:9000/graphql')
}
bootstrap();
