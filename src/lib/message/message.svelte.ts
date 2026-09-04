import { getter, options, type OptionsInput } from '@ampatspell/tiny/utils/options';
import { updateMessage, type MessageData } from './message.remote';
import { notBlank } from '@ampatspell/tiny/properties/validator';
import { type BroadcastChannel } from '@ampatspell/tiny/broadcast';
import { images } from '@ampatspell/tiny/utils/utils';
import { withDataFields } from '@ampatspell/tiny/fields/data';
import { useFiles } from '@ampatspell/tiny/files';

export type MessageModelOptions = Readonly<{
  data: MessageData;
  broadcast: BroadcastChannel;
}>;

export const useMessageModel = (_opts: OptionsInput<MessageModelOptions>) => {
  const files = useFiles();
  const opts = options(_opts);
  const broadcast = $derived(opts.broadcast);
  const data = $derived(opts.data);

  const [fields, state] = withDataFields({
    data: getter(() => ({
      ...data,
      background: files.asRemote(data.background),
    })),
  }).define(({ string, file }) => ({
    message: string('message', { validator: notBlank() }),
    background: file('background', { accept: images }),
  }));

  const save = async () => {
    if (state.touch()) {
      const data = state.serialized.dirty;
      if (data) {
        await updateMessage(data);
        broadcast.notifyDidSave();
      }
    }
  };

  return options({
    ...fields,
    ...state.opts,
    save,
  });
};
