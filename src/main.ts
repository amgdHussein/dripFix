import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  // Create the Nest application
  const app = await NestFactory.create(AppModule);

  // Set up basic authentication for the API endpoints [Swagger]
  app.use(
    ['/api', '/api-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // Enable Cross-Origin Resource Sharing (CORS)
  app.enableCors();

  // Create the Swagger documentation configuration
  const config = new DocumentBuilder()
    .setTitle(process.env.APP_TITLE)
    .setDescription(process.env.SWAGGER_DESCRIPTION)
    .setVersion(process.env.APP_VERSION)
    .build();

  // Generate the Swagger document based on the application and configuration
  const document = SwaggerModule.createDocument(app, config);

  // Set up the Swagger UI to serve the generated documentation
  SwaggerModule.setup('api', app, document);

  // Start the application server
  await app.listen(process.env.PORT);
}
bootstrap();
