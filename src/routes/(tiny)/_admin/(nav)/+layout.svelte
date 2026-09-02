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
        route: resolve('/(public)'),
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

<Backend>
  {@render children()}
</Backend>

<Floaters />
