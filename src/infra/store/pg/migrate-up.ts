import { appConfig } from '../../config/config';
import { AppLogger, initLogger } from '../../logger/logger';
import { PostgresStore } from './pg.store';

const migrateUp = async () => {
  const logger: AppLogger = initLogger(appConfig.infra.logger);
  const store = new PostgresStore(logger.child({ module: 'migrate-up' }));

  logger.info('Migrating up...');
  const res = await store.migratorInstance.migrateUp();
  logger.info(res);
  logger.info('Migrated up');
};

(async () => {
  await migrateUp();
  process.exit(1);
})();
