import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

interface IApiDocument {
  version: string;
  title: string;
  description?: string;
  path: string;
}

export abstract class ApiDocumentConfig {
  protected path: string;
  protected config: Omit<OpenAPIObject, 'paths'>;

  constructor(apiDocumentConfig: IApiDocument) {
    let builder: DocumentBuilder = new DocumentBuilder()
      .setTitle(apiDocumentConfig.title)
      .setVersion(apiDocumentConfig.version)
      .addBearerAuth(
        {
          description: 'JWT Token',
          name: 'Authorization',
          bearerFormat: 'JWT',
          scheme: 'bearer',
          type: 'http',
          in: 'header',
        },
        'authorization',
      );
    // .addSecurityRequirements('authorization', []);
    if (apiDocumentConfig.description)
      builder = builder.setDescription(apiDocumentConfig.description);

    this.config = builder.build();
    this.path = apiDocumentConfig.path;
  }

  listen(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, this.config);
    SwaggerModule.setup(this.path, app, document);
  }
}
