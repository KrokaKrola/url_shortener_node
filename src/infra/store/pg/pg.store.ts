import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { LinkTable } from '../../../domain/link/entity/link.interface';
import { AppLogger } from '../../logger/logger';

export interface IPostgresStore {
  link: LinkTable;
}

export class PostgresStore {
  private readonly dialect: PostgresDialect;

  private readonly db: Kysely<IPostgresStore>;

  private readonly logger: AppLogger;

  constructor(logger: AppLogger) {
    const pool = new Pool({
      database: 'test',
      host: 'localhost',
      user: 'admin',
      port: 5434,
      max: 10,
    });

    pool.on('error', (err) => {
      logger.error(err);
    });

    this.dialect = new PostgresDialect({
      pool,
    });

    this.db = new Kysely<IPostgresStore>({
      dialect: this.dialect,
    });

    this.logger = logger;
  }

  public get database(): Kysely<IPostgresStore> {
    return this.db;
  }

  async migrate() {
    this.logger.info('Migrating database...');
    this.logger.info('Migrating database finished');
  }
}
