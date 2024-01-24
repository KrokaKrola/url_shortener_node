import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('link')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('shortUrl', 'text', (col) => col.notNull())
    .addColumn('longUrl', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamp', (col) => col.notNull().defaultTo('now()'))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('link').execute();
}
