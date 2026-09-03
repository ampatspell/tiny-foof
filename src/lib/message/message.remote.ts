import { getDatabase, getFiles } from '#lib/services.js';
import { command, query } from '$app/server';
import { uid } from '@ampatspell/tiny/server/utils';
import { omit } from '@ampatspell/tiny/utils/object';
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
  async (props) => {
    const db = getDatabase();
    const { background } = props;
    const rest = omit(props, ['background']);

    let backgroundId;
    if (background) {
      const message = await db.selectFrom('messages').select('backgroundId').executeTakeFirstOrThrow();
      backgroundId = await getFiles().replace(message.backgroundId, uid(), background.file);
    }

    await db
      .updateTable('messages')
      .set({ ...rest, backgroundId })
      .execute();

    getMessage().refresh();
  },
);
