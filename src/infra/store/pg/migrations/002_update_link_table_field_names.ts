import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('link').renameColumn('shortUrl', 'short_url').execute();
  await db.schema.alterTable('link').renameColumn('longUrl', 'long_url').execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.alterTable('link').renameColumn('short_url', 'shortUrl').execute();
  await db.schema.alterTable('link').renameColumn('long_url', 'longUrl').execute();
}
