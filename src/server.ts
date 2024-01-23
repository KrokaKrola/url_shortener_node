import { Api } from './infra/api/api';
import { appConfig } from './infra/config/config';
import { AppLogger, initLogger } from './infra/logger/logger';
import { PostgresStore } from './infra/store/pg/pg.store';
import closeWithGrace from 'close-with-grace';

(async () => {
  const logger: AppLogger = initLogger(appConfig.infra.logger);

  const pgStore = new PostgresStore(logger.child({ module: 'database' }));
  await pgStore.migrate();

  const api = new Api(appConfig.infra.api, logger.child({ module: 'api' }));

  await api.listen();

  closeWithGrace({ delay: appConfig.app.gracefulShutdownTimeoutMs }, async ({ signal, err }) => {
    if (err) logger.fatal(err);
    else logger.info(`${signal} received, stopping server...`);

    await pgStore.database.destroy();
    await api.close();
  });
})();
