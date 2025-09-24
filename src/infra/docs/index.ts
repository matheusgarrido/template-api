import { INestApplication } from '@nestjs/common';
import ApiDocVersions from './api';
import { ApiDocumentConfig } from './config';

const DocVersions: ApiDocumentConfig[] = [...ApiDocVersions];

function createDocument(app: INestApplication) {
  DocVersions.map((DocVersion) => DocVersion.listen(app));
}

export default createDocument;
