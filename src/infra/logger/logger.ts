import { default as pino } from 'pino';

export { Logger as AppLogger } from 'pino';

export type Config = {
  level: string;
  version: string;
};

export const initLogger = (config: Config) =>
  pino({
    level: config.level,
  }).child({
    version: config.version,
  });
