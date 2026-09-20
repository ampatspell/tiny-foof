<script lang="ts">
  let { children } = $props();
</script>

<div class="pub">
  {@render children()}
</div>

<style lang="scss">
  .pub {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family:
      Menlo,
      Ubuntu Mono,
      monospace;
  }
</style>
