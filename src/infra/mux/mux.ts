import Fastify, { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ApiV1Handler } from './ApiV1Handler';
import { ApiHealthHandler } from './ApiHealthHandler';

export class Mux {
  private readonly fastify: FastifyInstance;

  constructor() {
    this.fastify = Fastify({
      logger: {
        transport: {
          target: 'pino-pretty',
        },
      },
    });

    this.initRoutes();
    this.initMiddlewares();
  }

  private initRoutes() {
    const apiV1Handler = new ApiV1Handler();
    const healthHandler = new ApiHealthHandler();

    this.fastify.addHook('onRoute', (routeOptions) => {
      if (routeOptions.method === 'HEAD') {
        return;
      }

      this.fastify.log.info(`Registered route: ${routeOptions.method} ${routeOptions.url}`);
    });

    this.fastify.register(healthHandler.initRoutes, { prefix: '/health' });
    this.fastify.register(apiV1Handler.initRoutes, { prefix: '/api/v1' });
  }

  private initMiddlewares() {}

  start() {
    this.fastify.listen({ port: 3000 });
  }
}
