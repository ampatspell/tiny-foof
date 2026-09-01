<script lang="ts">
  import { validatePrefix } from '@ampatspell/tiny/auth/guard/validate';
  import Entrypoint from '@ampatspell/tiny/entrypoint';

  let { children } = $props();

  let validate = validatePrefix({
    prefix: '/_admin',
    role: 'admin',
  });
</script>

<Entrypoint {validate}>
  {@render children()}
</Entrypoint>
