import { promises as fs } from 'node:fs';
import path from 'node:path';
import { initLogger } from '../../logger/logger';
import { appConfig } from '../../config/config';

const logger = initLogger(appConfig.infra.logger).child({ module: 'migration-create' });

const createMigration = async (migrationName: string) => {
  logger.info(`Creating migration ${migrationName}...`);
  const timestamp = new Date().getTime();
  const migrationFileName = `${timestamp}_${migrationName}.ts`;
  const migrationFilePath = path.join(__dirname, '/migrations', migrationFileName);

  const migrationFileContent = `import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
}
  
export async function down(db: Kysely<any>): Promise<void> {
}
`;

  await fs.writeFile(migrationFilePath, migrationFileContent);

  logger.info(`Created migration ${migrationName}`);
};

if (!process.env.NAME) {
  logger.error('NAME env variable is required');
  process.exit(1);
}

(async () => {
  await createMigration(process.env.NAME as string);
  process.exit(1);
})();
