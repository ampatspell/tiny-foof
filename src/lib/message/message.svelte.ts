import { getter, options, type OptionsInput } from '@ampatspell/tiny/utils/options';
import { updateMessage, type MessageData } from './message.remote';
import { useDataFields } from '@ampatspell/tiny/fields/data';
import { notBlank } from '@ampatspell/tiny/properties/validator';

export type MessageModelOptions = {
  data: MessageData;
};

export const useMessageModel = (_opts: OptionsInput<MessageModelOptions>) => {
  const opts = options(_opts);

  const fields = useDataFields({ data: getter(() => opts.data) });
  const message = fields.field.string('message', { validator: notBlank() });

  const isDirty = $derived(fields.isDirty);

  const save = async () => {
    if (fields.touch()) {
      const data = fields.dirty;
      if (data) {
        const { message } = data;
        await updateMessage({ message });
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
