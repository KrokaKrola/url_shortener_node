import { Api } from './infra/api/api';
import { appConfig } from './infra/config/config';
import { AppLogger, initLogger } from './infra/logger/logger';
import { AppDatabase, PostgresStore } from './infra/store/pg/pg.store';
import closeWithGrace from 'close-with-grace';

export interface IApp {
  database: AppDatabase;
}

(async () => {
  const logger: AppLogger = initLogger(appConfig.infra.logger);

  const pgStore = new PostgresStore(logger.child({ module: 'database' }));
  await pgStore.migrate();

  const app: IApp = {
    database: pgStore.database,
  };

  const api = new Api(appConfig.infra.api, logger.child({ module: 'api' }), app);

  await api.listen();

  closeWithGrace({ delay: appConfig.app.gracefulShutdownTimeoutMs }, async ({ signal, err }) => {
    if (err) logger.fatal(err);
    else logger.info(`${signal} received, stopping server...`);

    await pgStore.close();
    await api.close();
  });
})();
