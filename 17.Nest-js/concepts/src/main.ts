import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  //create an instance of the NestJS application
  const app = await NestFactory.create(AppModule);

  //start listening for incoming requests on the specified port
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
