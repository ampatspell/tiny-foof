import { createServiceGetters } from '@ampatspell/tiny/server/handle';
import type { DB } from './schema';

const { getDatabase, getFiles, getStorage } = createServiceGetters<DB>();

export { getDatabase, getFiles, getStorage };
