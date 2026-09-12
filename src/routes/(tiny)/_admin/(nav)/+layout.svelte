<script lang="ts">
  import { resolve } from '$app/paths';
  import Backend from '@ampatspell/tiny/backend/backend';
  import { setBackend } from '@ampatspell/tiny/backend/context';
  import { equals } from '@ampatspell/tiny/backend/navigation/model';
  import Floaters from '@ampatspell/tiny/floating/floaters/floaters';
  import { setFloaters } from '@ampatspell/tiny/floating/floaters/model';
  import LucideCat from '@ampatspell/tiny/icons/lucide--cat';
  import TablerBalloon from '@ampatspell/tiny/icons/tabler--balloon';
  import TablerCloud from '@ampatspell/tiny/icons/tabler--cloud';
  import TablerUser from '@ampatspell/tiny/icons/tabler--user';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();

  setBackend({
    items: [
      {
        name: 'Public',
        icon: TablerCloud,
        route: resolve('/'),
        cmp: equals,
      },
      {
        name: 'Cat',
        icon: LucideCat,
        route: resolve('/(tiny)/_admin/(nav)'),
        cmp: equals,
      },
      {
        name: 'Message',
        icon: TablerBalloon,
        route: resolve('/(tiny)/_admin/(nav)/message'),
      },
      {
        name: 'Users',
        icon: TablerUser,
        route: resolve('/(tiny)/_admin/(nav)/users'),
        select: (id) => resolve('/(tiny)/_admin/(nav)/users/[id]', { id }),
      },
    ],
  });

  setFloaters();
</script>

<svelte:head>
  <title>Tiny _admin</title>
</svelte:head>

<Backend>
  {@render children()}
</Backend>

<Floaters />
