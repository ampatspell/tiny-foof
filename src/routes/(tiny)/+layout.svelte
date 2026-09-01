<script lang="ts">
  import Tiny from '@ampatspell/tiny/tiny';

  let { children } = $props();
</script>

<svelte:head>
  <title>Welcome to Tiny</title>
</svelte:head>

<Tiny>
  {@render children()}
</Tiny>
