// Responsabilidade Única: Apenas gerenciar as conexoes
import { DatabaseConnectionError } from '@shared/errors';
import {
  ConnectionOptions,
  Options,
  ReplicationOptions,
  Sequelize,
} from 'sequelize';

export class DatabaseConnections {
  private static connections: Map<string, DatabaseConnections> = new Map();
  private readonly currentConnection: Sequelize;

  // Construtor com a lógica de inicialização de conexoes
  private constructor(
    dbConfig: Options,
    private readonly replicaHosts?: string[],
  ) {
    const { database, username, password, host, port, ...config } = dbConfig;

    const basicOptions: ConnectionOptions = {
      database,
      username,
      password,
      port,
    };

    const options: Options = {
      ...config,
      pool: {
        max: 10,
        idle: 30000,
      },
      logging: console.log,
    };

    if (!this.replicaHosts?.length) Object.assign(options, dbConfig);
    else {
      const replication: ReplicationOptions = {
        write: { ...basicOptions, host },
        read: this.replicaHosts?.length
          ? this.replicaHosts?.map((replicaHost) => ({
              ...basicOptions,
              host: replicaHost,
            }))
          : [],
      };
      options.replication = replication;
    }

    this.currentConnection = new Sequelize(
      database as string,
      username as string,
      password as string,
      options,
    );

    DatabaseConnections.connections = DatabaseConnections.connections.set(
      database as string,
      this,
    );
  }

  public static connect(
    dbConfig: Options,
    replicaHosts?: string[],
  ): DatabaseConnections {
    return DatabaseConnections.getInstance(
      dbConfig.database as string,
      dbConfig,
      replicaHosts,
    );
  }

  public static getInstance(
    database: string,
    dbConfig?: Options,
    replicaHosts?: string[],
  ): DatabaseConnections {
    const dbConnection = DatabaseConnections.connections?.get(database);
    if (!dbConnection) {
      if (!dbConfig) {
        throw new DatabaseConnectionError();
      }
      return new DatabaseConnections(dbConfig, replicaHosts);
    }
    return dbConnection;
  }

  get connection(): Sequelize {
    return this.currentConnection;
  }

  get countReplicas(): number {
    return this.replicaHosts?.length ?? 0;
  }

  get master() {
    return this.connection;
  }
}
