import { default as pino } from 'pino';

export { Logger as AppLogger } from 'pino';

export type LoggerConfig = {
  level: string;
  version: string;
};

export const initLogger = (config: LoggerConfig) =>
  pino({
    level: config.level,
  }).child({
    version: config.version,
  });
