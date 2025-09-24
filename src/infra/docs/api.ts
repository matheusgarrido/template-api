import { ApiDocumentConfig } from './config';

class ApiDocument extends ApiDocumentConfig {
  constructor(version: string) {
    super({
      path: 'api/docs',
      title: 'API',
      description: 'API Documentation',
      version,
    });
  }
}

const docs = ['1.0'].map((version) => new ApiDocument(version));

export default docs;
