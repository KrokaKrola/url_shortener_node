import { FastifyInstance } from "fastify";

export class ApiHealthHandler {
  public initRoutes(fastify: FastifyInstance, opts: any, done: any) {
    fastify.get('/', async () => {
      return { status: 'ok' };
    });

    done();
  }
}