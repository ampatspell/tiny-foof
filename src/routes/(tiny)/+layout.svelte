<script lang="ts">
  import Tiny from '@ampatspell/tiny/tiny';

  let { children } = $props();
</script>

<svelte:head>
  <title>Tiny _admin</title>
</svelte:head>

<Tiny>
  {@render children()}
</Tiny>
