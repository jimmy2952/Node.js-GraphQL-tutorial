// src/utils/database.ts
import { Pool, PoolConfig } from 'pg';

export class DB {
  pool: Pool;

  constructor(options: PoolConfig) {
    this.pool = new Pool(options);
  }

  query(sql: string, params: any) {
    return this.pool.query(sql, params);
  }
}
