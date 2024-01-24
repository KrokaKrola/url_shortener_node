import { FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { AppDatabase } from '../../infra/store/pg/pg.store';
import { Link } from '../../domain/link/entity/link.interface';

export class LinkController {
  constructor(private readonly database: AppDatabase) {}

  public init(): FastifyPluginAsync {
    return async (fastify: FastifyInstance) => {
      fastify.get('/', this.getLinks);
    };
  }

  private async getLinks(req: FastifyRequest, res: FastifyReply): Promise<Link[]> {
    const result = await this.database.selectFrom('link').selectAll().execute();

    return result;
  }
}
