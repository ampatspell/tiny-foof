import { getter, options, type OptionsInput } from '@ampatspell/tiny/utils/options';
import { updateMessage, type MessageData } from './message.remote';
import { type BroadcastChannel } from '@ampatspell/tiny/broadcast';
import { images } from '@ampatspell/tiny/utils/utils';
import { useFiles } from '@ampatspell/tiny/files';
import { withDataFields } from '@ampatspell/tiny/fields/index';
import { notBlank } from '@ampatspell/tiny/fields/models/validator';
import { resolve } from '$app/paths';

export type MessageModelOptions = Readonly<{
  data: MessageData;
  broadcast: BroadcastChannel;
}>;

export const useMessageModel = (_opts: OptionsInput<MessageModelOptions>) => {
  const files = useFiles();
  const opts = options(_opts);
  const broadcast = $derived(opts.broadcast);
  const data = $derived(opts.data);

  const fields = withDataFields({
    data: getter(() => ({
      ...data,
      background: files.asRemote(data.background),
    })),
  }).define(({ string, file }) => ({
    message: string('message', { validator: notBlank }),
    background: file('background', { accept: images, variant: '1024x1024' }),
  }));

  const save = async () => {
    if (fields.touch()) {
      const data = fields.serialized.dirty;
      if (data) {
        await updateMessage(data);
        broadcast.notifyDidSave();
      }
    }
  };

  const title = 'Message';
  const route = resolve('/');

  return fields.asEditable({
    save,
    title,
    route,
  });
};
