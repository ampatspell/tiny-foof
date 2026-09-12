import { useBroadcastChannel } from '@ampatspell/tiny/broadcast';
import { withDataFields } from '@ampatspell/tiny/fields/index';
import { notBlank, optionalPassword, requiredEmail } from '@ampatspell/tiny/fields/models/validator';
import { getter, options, type OptionsInput } from '@ampatspell/tiny/utils/options';
import { updateUser, type UserData } from './users.remote';

export type UseUserModelOptions = {
  data: UserData;
};

export const useUserModel = (_opts: OptionsInput<UseUserModelOptions>) => {
  const opts = options(_opts);
  const data = $derived(opts.data);
  const id = $derived(data.id);

  const broadcast = useBroadcastChannel();

  const fields = withDataFields({
    data: getter(() => ({ ...data, password: '' })),
  }).define(({ string }) => {
    return {
      email: string('email', { validator: requiredEmail }),
      role: string('role', { validator: notBlank }),
      password: string('password', {
        validator: optionalPassword,
        description: 'Leave blank to keep the current password',
        type: 'password',
      }),
    };
  });

  const save = async () => {
    if (fields.touch()) {
      const dirty = fields.serialized.dirty;
      if (dirty) {
        await updateUser({ id, ...dirty });
        fields.rollback();
        broadcast.notifyDidSave();
      }
    }
  };

  return fields.asEditable({
    save,
    route: undefined,
    title: getter(() => data.email),
  });
};
