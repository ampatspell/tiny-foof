<script lang="ts">
  import Fonts from '@ampatspell/tiny/fonts';
  let { children } = $props();
</script>

<Fonts fonts={{ families: { 'Azeret Mono': [400] }, display: 'swap' }} />

<div class="pub">
  {@render children()}
</div>

<style lang="scss">
  .pub {
    flex: 1;
    display: flex;
    flex-direction: column;
    font-family:
      'Azeret Mono',
      Ubuntu Mono,
      monospace;
  }
</style>
