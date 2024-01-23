import { FastifyInstance, FastifyPluginOptions } from "fastify";

export class ApiV1Handler {
  public initRoutes(fastify: FastifyInstance, opts: FastifyPluginOptions, done: (err?: Error | undefined) => void) {
    fastify.get('/', async () => {
      return { hello: 'world' };
    });

    done();
  }
}