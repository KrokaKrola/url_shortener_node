import { default as fastify, FastifyBaseLogger, FastifyInstance } from 'fastify';
import { AppLogger } from '../logger/logger';
import { ApiV1 } from './api-v1';
import { IApp } from '../../server';

export type ApiConfig = {
  port: number;
};

export class Api {
  private readonly fastify: FastifyInstance;

  constructor(private readonly config: ApiConfig, private readonly logger: AppLogger, app: IApp) {
    this.fastify = fastify({
      logger: logger as FastifyBaseLogger,
      exposeHeadRoutes: false,
    });

    this.fastify.register(new ApiV1().init(app));
  }

  async listen() {
    await this.fastify.listen({ port: this.config.port });

    this.logger.info(`Listening on port ${this.config.port}`);
  }

  async close() {
    await this.fastify.close();
  }
}
