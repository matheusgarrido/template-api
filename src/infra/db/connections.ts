// Responsabilidade Única: Apenas gerenciar as conexoes
import { Options, Sequelize } from 'sequelize';

export class DatabaseConnections {
  private static instance: DatabaseConnections;
  protected readonly masterConnection: Sequelize;
  protected readonly replicaConnections: Sequelize[] = [];

  // Construtor com a lógica de inicialização de conexoes
  private constructor(dbConfig: Options, replicaHosts?: string) {
    // Conexao com a instancia master
    this.masterConnection = new Sequelize(dbConfig);

    // Conexoes para as replicas de leitura (se existirem)
    const readReplicaHosts = (replicaHosts || '').split(',').filter((h) => h);
    this.replicaConnections = readReplicaHosts
      .map((host) => {
        if (host) {
          return new Sequelize({
            ...dbConfig,
            host: host.trim(),
          });
        }
        return null;
      })
      .filter((conn) => conn !== null);
  }

  public static getInstance(
    dbConfig: Options,
    replicaHosts?: string,
  ): DatabaseConnections {
    if (!DatabaseConnections.instance) {
      DatabaseConnections.instance = new DatabaseConnections(
        dbConfig,
        replicaHosts,
      );
    }
    return DatabaseConnections.instance;
  }

  get countReplicas(): number {
    return this.replicaConnections.length;
  }

  get master() {
    return this.masterConnection;
  }

  // Logica simples de load balancing para as replicas
  getConnection(): Sequelize {
    const countReplicas = this.countReplicas;
    if (!countReplicas) return this.masterConnection;
    if (countReplicas == 1) return this.replicaConnections[0];

    const index = Math.floor(Math.random() * this.replicaConnections.length);
    return this.replicaConnections[index];
  }
}
