<script lang="ts">
  import { resolve } from '$app/paths';
  import Backend from '@ampatspell/tiny/backend/backend';
  import { setBackend } from '@ampatspell/tiny/backend/context';
  import Floaters from '@ampatspell/tiny/floating/floaters/floaters';
  import { setFloaters } from '@ampatspell/tiny/floating/floaters/model';
  import TablerBalloon from '@ampatspell/tiny/icons/tabler--balloon';
  import TablerCloud from '@ampatspell/tiny/icons/tabler--cloud';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  setBackend({
    items: [
      {
        name: 'Public',
        icon: TablerCloud,
        route: resolve('/'),
      },
      {
        name: 'Message',
        icon: TablerBalloon,
        route: resolve('/(tiny)/_admin/(nav)/message'),
      },
    ],
  });

  setFloaters();
</script>

<svelte:head>
  <title>Tiny backend</title>
</svelte:head>

<Backend>
  {@render children()}
</Backend>

<Floaters />
