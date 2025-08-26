import { Options } from 'sequelize';
import { DatabaseConnections } from '../connections';
import { DatabaseRouter } from '../router';

type Env = 'production' | 'homolog' | 'development';
const env: Env = (process.env.NODE_ENV as Env) || 'development';

let dbConfig: Options;
switch (env) {
  case 'production':
    dbConfig = {
      host: process.env.DATABASE_HOST_PROD,
      port: Number(process.env.DATABASE_PORT_PROD),
      username: process.env.DATABASE_USER_PROD,
      password: process.env.DATABASE_PSWD_PROD,
    };
    break;
  case 'homolog':
    dbConfig = {
      host: process.env.DATABASE_HOST_HOMOLOG,
      port: Number(process.env.DATABASE_PORT_HOMOLOG),
      username: process.env.DATABASE_USER_HOMOLOG,
      password: process.env.DATABASE_PSWD_HOMOLOG,
    };
    break;
  case 'development':
  default:
    dbConfig = {
      host: process.env.DATABASE_HOST_DEV,
      port: Number(process.env.DATABASE_PORT_DEV),
      username: process.env.DATABASE_USER_DEV,
      password: process.env.DATABASE_PSWD_DEV,
    };
}
dbConfig.dialect = 'mysql';

const replicaHosts = process.env.DATABASE_READ_REPLICA_HOSTS;

export const databaseMasterConnections = DatabaseConnections.getInstance(
  dbConfig,
  replicaHosts,
);

export const databaseMaster = new DatabaseRouter(databaseMasterConnections);

// Usar database nos repositórios
