import { DatabaseConnections } from '../connections';
import { DatabaseRouter } from '../router';
import dotenv from 'dotenv';
dotenv.config();

// import * as databaseConfig from '../../../../infra/database/config';
import databaseConfig from '../../../../infra/database/config';
import { Dialect } from 'sequelize';

const replicaHosts = process.env.DATABASE_READ_REPLICA_HOSTS;

export const databaseMasterConnections = DatabaseConnections.getInstance(
  {
    host: databaseConfig.host,
    port: Number(databaseConfig.port),
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.database,
    dialect: databaseConfig.dialect as Dialect,
  },
  replicaHosts,
);

export const databaseMaster = new DatabaseRouter(databaseMasterConnections);

// Usar database nos repositórios
