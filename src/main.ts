import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // Import NestExpressApplication
import { join } from 'path';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // Specify NestExpressApplication

  const corsOptions: CorsOptions = {
    origin: ['http://localhost:4200', 'https://echonotesblogs.vercel.app/'], // Replace with your frontend URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true, // If you need to send cookies or other credentials
  };

  app.enableCors(corsOptions);
  app.useStaticAssets(join(__dirname, '..', 'uploads')); // Serve static assets
  await app.listen(3000);
}
bootstrap();
