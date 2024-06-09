import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtMiddleware } from './middleware/jwt.middleware';

const endPoints = {
  GRAPHQL: 'http://localhost:9000/graphql',
  LOGIN: 'http://localhost:9000/auth/login',
  VALIDAR_EMAIL:'http://localhost:9000/auth/validate-email/:email',
  OBTENER_IMAGEN: 'http://localhost:9000/images/:filename'
}

const routes = Object.entries(endPoints).map(([accion, ruta]) => ({
  Acción: accion,
  Ruta: ruta
}));

const showRoutes = () => {
  console.log('RUTAS: ')
  console.table(routes);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(new JwtMiddleware().use);
  await app.listen(9000);
  showRoutes();
}
bootstrap();
