import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5090;
  await app.listen(PORT);
  console.log(`server listening on port ${PORT}`);
}
bootstrap();
