import { Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

import databaseConfig from '@project/infra/database/config';
import { DatabaseConnections } from '@database/connections';

const slaveReplications: string[] = process.env.DATABASE_READ_REPLICA_HOSTS
  ? JSON.parse(process.env.DATABASE_READ_REPLICA_HOSTS)
  : [];

export const masterDatabase = DatabaseConnections.connect(
  {
    host: databaseConfig.host,
    port: Number(databaseConfig.port),
    username: databaseConfig.username,
    password: databaseConfig.password,
    database: databaseConfig.database,
    dialect: databaseConfig.dialect as Dialect,
  },
  slaveReplications,
);
