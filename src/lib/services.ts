import { createServiceGetters } from '@ampatspell/tiny/server/services/handle';
import type { DB } from './schema';

const { getDatabase, getFiles, getStorage, getUsers } = createServiceGetters<DB>();

export { getDatabase, getFiles, getStorage, getUsers };
