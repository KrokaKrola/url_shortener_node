import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely';

export interface LinkTable {
  id: Generated<number>;

  shortUrl: string;

  longUrl: string;

  created_at: ColumnType<Date, string | undefined, never>;
}

export type Link = Selectable<LinkTable>;
export type NewLink = Insertable<LinkTable>;
export type LinkUpdate = Updateable<LinkTable>;
