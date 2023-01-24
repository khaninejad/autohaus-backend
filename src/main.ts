import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port: number = process.env.PORT
    ? Number.parseInt(process.env.PORT, 10)
    : 4000;

  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(`🚀 application now running at ${port}`, 'main.ts');
}

bootstrap().then(() => Logger.log('🛠 bootstrapped application', 'main.ts'));
