<script lang="ts">
  import { page } from '$app/state';
  import Dark from '@ampatspell/tiny/dark.svelte';
  import TablerBalloon from '@ampatspell/tiny/icons/tabler--balloon.svelte';
  import Placeholder from '@ampatspell/tiny/placeholder.svelte';
  import { isTruthy } from '@ampatspell/tiny/utils/array';

  let status = $derived(page.status);
  let error = $derived(page.error?.message ?? 'Unknown error');
  let label = $derived.by(() => {
    return [status !== 200 && status, error].filter(isTruthy).join(' ');
  });
</script>

<Dark>
  <Placeholder icon={TablerBalloon} {label} />
</Dark>
