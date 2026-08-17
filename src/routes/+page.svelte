<script lang="ts">
  import { getMessage } from '$lib/hello.remote';

  let message = $derived(await getMessage());
</script>

<div class="page">
  <div class="welcome">{message}</div>
</div>

<style lang="scss">
  .page {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
