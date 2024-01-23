import { default as fastify, FastifyBaseLogger, FastifyInstance } from 'fastify';
import { AppLogger } from '../logger/logger';

export type ApiConfig = {
  port: number;
};

export class Api {
  private readonly fastify: FastifyInstance;

  constructor(private readonly config: ApiConfig, private readonly logger: AppLogger) {
    this.fastify = fastify({
      logger: logger as FastifyBaseLogger,
    });

    // this.initRoutes();
    // this.initMiddlewares();
  }

  // private initRoutes() {
  //   const apiV1Handler = new ApiV1Handler();
  //   const healthHandler = new ApiHealthHandler();

  //   // this.fastify.addHook('onRoute', (routeOptions) => {
  //   //   if (routeOptions.method === 'HEAD') {
  //   //     return;
  //   //   }

  //   //   this.fastify.log.info(`Registered route: ${routeOptions.method} ${routeOptions.url}`);
  //   // });

  //   this.fastify.register(healthHandler.initRoutes, { prefix: '/health' });
  //   this.fastify.register(apiV1Handler.initRoutes, { prefix: '/api/v1' });
  // }

  // private initMiddlewares() {}

  async listen() {
    await this.fastify.listen({ port: this.config.port });

    this.logger.info(`Listening on port ${this.config.port}`);
  }

  async close() {
    await this.fastify.close();
  }
}
