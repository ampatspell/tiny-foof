import { STORAGE_ROOT, USERS_SECRET } from '$app/env/private';
import { jpeg } from '@ampatspell/tiny/server/files/thumbnails';
import { createHandle } from '@ampatspell/tiny/server/services/handle';
import { createBasicLogger } from '@ampatspell/tiny/server/utils';

export const handle = createHandle({
  dir: STORAGE_ROOT,
  users: {
    secret: USERS_SECRET,
  },
  files: {
    thumbnails: [jpeg({ size: 100 }), jpeg({ size: 1024 })],
  },
  logger: createBasicLogger(),
});
