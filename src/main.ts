import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {NestExpressApplication} from '@nestjs/platform-express';
import * as cors from 'cors';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    // Enable CORS
    app.use(cors());

    app.useGlobalPipes(new ValidationPipe({whitelist: true}));
    await app.listen(3000);
}
bootstrap();
