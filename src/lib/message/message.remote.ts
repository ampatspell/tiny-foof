import { getDatabase, getFiles } from '#lib/services.js';
import { command, query } from '$app/server';
import { uid } from '@ampatspell/tiny/server/utils';
import { hasKeys, omit } from '@ampatspell/tiny/utils/object';
import type { QueryResponse } from '@ampatspell/tiny/utils/utils';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import * as v from 'valibot';

export const getMessage = query(async () => {
  let record = await getDatabase().selectFrom('messages').selectAll().executeTakeFirst();
  if (!record) {
    const backgroundId = uid();
    const buffer = await readFile(fileURLToPath(import.meta.resolve('@ampatspell/tiny/assets/film-0677-011.jpg')));
    const file = new File([buffer], 'film-0677-011.jpg', { type: 'image/jpeg' });
    await getFiles().store(backgroundId, file);

    record = await getDatabase()
      .insertInto('messages')
      .values({
        id: uid(),
        message: 'To whom it may concern: It is springtime. It is late afternoon.',
        backgroundId,
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  let background;
  if (record.backgroundId) {
    background = await getFiles().data(record.backgroundId);
  }

  return {
    ...record,
    background,
  };
});

export type MessageData = QueryResponse<typeof getMessage>;

export const updateMessage = command(
  v.strictObject({
    message: v.optional(v.string()),
    background: v.optional(v.strictObject({ file: v.optional(v.file()) })),
  }),
  async (arg) => {
    const props = omit(arg, ['background']);
    const { background } = arg;
    const db = getDatabase();
    if (background) {
      const files = getFiles();
      const record = await db.selectFrom('messages').selectAll().executeTakeFirstOrThrow();
      if (record.backgroundId) {
        await files.drop(record.backgroundId);
      }
      let backgroundId = null;
      if (background.file) {
        backgroundId = uid();
        await files.store(backgroundId, background.file);
      }
      await db.updateTable('messages').set({ backgroundId }).execute();
    }
    if (hasKeys(props)) {
      await db.updateTable('messages').set(props).execute();
    }
    getMessage().refresh();
  },
);
