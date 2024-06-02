/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;

  app.enableCors({
    origin: '*', // Update this to allow requests from specific origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
    credentials: true,
  });

  await app.listen(port, '0.0.0.0');
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();


/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

// import { Logger } from '@nestjs/common';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app/app.module';
// import * as process from 'process';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   const host = '0.0.0.0'; // Listen on all network interfaces
//   const port = process.env.PORT ;

//   await app.listen(port, host);
  
//   const globalPrefix = 'api';
//   app.setGlobalPrefix(globalPrefix);

//   app.enableCors({
//     origin: '*', // Update this to allow requests from specific origins
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 204,
//     allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
//     credentials: true,
//   });

//   Logger.log(
//     `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
//   );
// }

// bootstrap();
