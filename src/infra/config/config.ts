import { ApiConfig } from '../api/api';
import { LoggerConfig } from '../logger/logger';

type AppConfig = {
  infra: {
    logger: LoggerConfig;
    api: ApiConfig;
  };
  app: {
    gracefulShutdownTimeoutMs: number;
  };
};

export const appConfig: AppConfig = {
  infra: {
    logger: {
      level: process.env.LOGGER_LEVEL || 'info',
      version: process.env.npm_package_version || 'unknown',
    },
    api: {
      port: parseInt(process.env.PORT || '3000', 10),
    },
  },
  app: {
    gracefulShutdownTimeoutMs: parseInt(process.env.GRACEFUL_SHUTDOWN_TIMEOUT_MS || '10000', 10),
  },
};
