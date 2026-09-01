import { getter, options, type OptionsInput } from '@ampatspell/tiny/utils/options';
import { updateMessage, type MessageData } from './message.remote';
import { useDataFields } from '@ampatspell/tiny/fields/data';
import { notBlank } from '@ampatspell/tiny/properties/validator';
import { type BroadcastChannel } from '@ampatspell/tiny/broadcast';

export type MessageModelOptions = Readonly<{
  data: MessageData;
  broadcast: BroadcastChannel;
}>;

export const useMessageModel = (_opts: OptionsInput<MessageModelOptions>) => {
  const opts = options(_opts);
  const broadcast = $derived(opts.broadcast);
  const data = $derived(opts.data);

  const fields = useDataFields({ data: getter(() => data) });
  const message = fields.field.string('message', { validator: notBlank() });

  const isDirty = $derived(fields.isDirty);

  const save = async () => {
    if (fields.touch()) {
      const data = fields.dirty;
      if (data) {
        const { message } = data;
        await updateMessage({ message });
        broadcast.notifyDidSave();
      }
    }
  };

  const rollback = () => fields.rollback();

  return options({
    message,
    isDirty: getter(() => isDirty),
    save,
    rollback,
  });
};
