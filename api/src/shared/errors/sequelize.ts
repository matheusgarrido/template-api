export interface SequelizeError extends Error {
  original?: {
    code?: string;
    sqlState?: string;
    errno?: number;
    sqlMessage?: string;
    sql?: string;
  };
  sql?: string;
  parameters?: any[];
}

export interface MysqlError extends Error {
  code?: string;
  errno?: number;
  sqlState?: string;
  sqlMessage?: string;
  sql?: string;
}
