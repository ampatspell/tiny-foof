import { query } from '$app/server';
import { sql } from 'kysely';
import { getDatabase } from './services';

export const getMessage = query(async () => {
  const db = getDatabase();
  const {
    rows: [{ message }],
  } = await sql<{ message: string }>`select 'Welcome to Tiny' as message`.execute(db);

  return message;
});
