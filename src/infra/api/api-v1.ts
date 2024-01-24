import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { LinkController } from '../../ui/controllers/link.controller';
import { IApp } from '../../server';

export class ApiV1 {
  init(app: IApp): FastifyPluginAsync {
    return async (fastify: FastifyInstance) => {
      fastify.register(new LinkController(app.database).init(), { prefix: '/links' });
    };
  }
}
