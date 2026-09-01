/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kysely } from 'kysely';

export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable('messages')
    .addColumn('id', 'text', (col) => col.notNull().primaryKey())
    .addColumn('message', 'text', (col) => col.notNull())
    .addColumn('background_id', 'text')
    .execute();
};

export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable('messages').execute();
};
