<script lang="ts">
  let { children } = $props();
</script>

<svelte:head>
  <title>Tiny</title>
</svelte:head>

{@render children()}
