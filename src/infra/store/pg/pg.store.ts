import { FileMigrationProvider, Kysely, Migrator, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { LinkTable } from '../../../domain/link/entity/link.interface';
import { AppLogger } from '../../logger/logger';
import path from 'node:path';
import { promises as fs } from 'fs';

interface IPostgresStore {
  link: LinkTable;
}

export type AppDatabase = Kysely<IPostgresStore>;

export class PostgresStore {
  private readonly dialect: PostgresDialect;

  private readonly db: Kysely<IPostgresStore>;

  private readonly logger: AppLogger;

  private readonly migrator: Migrator;

  constructor(logger: AppLogger) {
    const pool = new Pool({
      connectionString:
        'postgresql://u_url_shortener_user:u_url_shortener_password@localhost:5432/url_shortener?sslmode=disable',
    });

    pool.query('SELECT NOW()', (err, res) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info(`Connected to database at ${res.rows[0].now}`);
      }
    });

    this.dialect = new PostgresDialect({
      pool,
    });

    this.db = new Kysely<IPostgresStore>({
      dialect: this.dialect,
    });

    this.migrator = new Migrator({
      db: this.db,
      provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: path.join(__dirname, '/migrations'),
      }),
    });

    this.logger = logger;
  }

  public get database(): Kysely<IPostgresStore> {
    return this.db;
  }

  public get migratorInstance(): Migrator {
    return this.migrator;
  }

  async migrate() {
    this.logger.info('Migrating database...');

    const { error, results } = await this.migrator.migrateToLatest();

    results?.forEach((it) => {
      if (it.status === 'Success') {
        this.logger.info(`migration "${it.migrationName}" was executed successfully`);
      } else if (it.status === 'Error') {
        this.logger.error(`failed to execute migration "${it.migrationName}"`);
      }
    });

    if (error) {
      this.logger.error('Migrating database failed');
      this.logger.error(error);
    } else {
      this.logger.info('Migrating database finished');
    }
  }

  async close() {
    await this.db.destroy();
  }
}
