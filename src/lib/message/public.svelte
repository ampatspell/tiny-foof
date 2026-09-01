<script lang="ts">
  import { getMessage } from './message.remote';

  let record = $derived(await getMessage());
</script>

<div class="page">
  <div class="message">{record.message}</div>
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: var(--tiny-font-size-small);
  }
</style>
