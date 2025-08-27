import { DatabaseConnections } from '../connections';
import { DatabaseRouter } from '../router';

const replicaHosts = process.env.DATABASE_READ_REPLICA_HOSTS;

export const databaseMasterConnections = DatabaseConnections.getInstance(
  {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PSWD,
    dialect: 'mysql',
  },
  replicaHosts,
);

export const databaseMaster = new DatabaseRouter(databaseMasterConnections);

// Usar database nos repositórios
