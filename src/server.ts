import { AppLogger, initLogger } from './infra/logger/logger';
import { PostgresStore } from './infra/store/pg/pg.store';

(async () => {
  const logger: AppLogger = initLogger({
    level: 'debug',
    version: '1.0.0',
  });

  const pgStore = new PostgresStore(logger.child({ module: 'database' }));

  await pgStore.migrate();
})();
