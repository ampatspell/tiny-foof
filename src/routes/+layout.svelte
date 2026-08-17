<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import Dark from '@ampatspell/tiny/components/dark.svelte';

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Dark>
  {@render children()}
</Dark>
