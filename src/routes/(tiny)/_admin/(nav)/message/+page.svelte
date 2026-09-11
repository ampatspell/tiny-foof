<script lang="ts">
  import { getMessage } from '#lib/message/message.remote.js';
  import { useMessageModel } from '#lib/message/message.svelte.js';
  import { useBroadcastChannel } from '@ampatspell/tiny/broadcast';
  import Content from '@ampatspell/tiny/form/content/content';
  import Fields from '@ampatspell/tiny/form/content/fields';
  import Form from '@ampatspell/tiny/form/form';
  import Editing from '@ampatspell/tiny/layout/editing/editing';
  import { useEditingLayout } from '@ampatspell/tiny/layout/editing/layout';
  import { getter } from '@ampatspell/tiny/utils/options';

  let broadcast = useBroadcastChannel();
  let data = $derived(await getMessage());
  let model = useMessageModel({
    data: getter(() => data),
    broadcast,
  });
  let layout = useEditingLayout({
    model,
  });
</script>

<Editing {layout}>
  <Form size="wide">
    <Content>
      <Fields field={model.fields.message} />
      <Fields field={model.fields.background} />
    </Content>
  </Form>
</Editing>
