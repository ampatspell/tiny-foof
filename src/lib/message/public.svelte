<script lang="ts">
  import { url } from '@ampatspell/tiny/utils/style';
  import { getMessage } from './message.remote';
  import { resolve } from '$app/paths';
  import pkg from '@ampatspell/tiny/package.json';

  let record = $derived(await getMessage());
  let background = $derived.by(() => {
    const id = record.backgroundId;
    if (id) {
      return resolve('/files/[id]/[variant]', { id, variant: '2048x2048' });
    }
  });
  let version = pkg.version;
</script>

<div class="page" style:--background={url(background)}>
  <div class="content">
    <div class="message">
      <div>{record.message}</div>
      <div>Welcome to Tiny v{version}</div>
      <div><a href={resolve('/(tiny)/_admin/(nav)')}>admin →</a></div>
    </div>
  </div>
</div>

<style lang="scss">
  .page {
    flex: 1;
    position: relative;
    overflow: hidden;
    > .content {
      position: absolute;
      --offset: -30px;
      top: var(--offset);
      right: var(--offset);
      bottom: var(--offset);
      left: var(--offset);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--background) center center / cover no-repeat;
      > .message {
        font-size: var(--tiny-font-size-small);
        color: #000;
        display: flex;
        flex-direction: column;
      }
    }
  }
</style>
