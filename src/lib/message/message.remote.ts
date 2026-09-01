import { getDatabase } from '#lib/getters.js';
import { command, query } from '$app/server';
import { uid } from '@ampatspell/tiny/server/utils';
import type { QueryResponse } from '@ampatspell/tiny/utils/utils';
import * as v from 'valibot';

export const getMessage = query(async () => {
  let record = await getDatabase().selectFrom('messages').selectAll().executeTakeFirst();
  if (!record) {
    record = await getDatabase()
      .insertInto('messages')
      .values({
        id: uid(),
        message: 'To whom it may concern: It is springtime. It is late afternoon.',
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }
  return record;
});

export type MessageData = QueryResponse<typeof getMessage>;

export const updateMessage = command(
  v.object({
    message: v.optional(v.string()),
  }),
  async ({ message }) => {
    await getDatabase().updateTable('messages').set({ message }).execute();
    getMessage().refresh();
  },
);
