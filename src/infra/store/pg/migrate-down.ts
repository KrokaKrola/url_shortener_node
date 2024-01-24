import { appConfig } from '../../config/config';
import { AppLogger, initLogger } from '../../logger/logger';
import { PostgresStore } from './pg.store';

const migrateDown = async () => {
  const logger: AppLogger = initLogger(appConfig.infra.logger);
  const store = new PostgresStore(logger.child({ module: 'migrate-down' }));

  logger.info('Migrating down...');
  const res = await store.migratorInstance.migrateDown();
  logger.info(res);
  logger.info('Migrated down');
};

(async () => {
  await migrateDown();
  process.exit(1);
})();
