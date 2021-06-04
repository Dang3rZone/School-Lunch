<script>
  import { Route } from 'svelte-router-spa'
  import { onMount } from 'svelte'
  import { user } from '../../store/stores'

  export let currentRoute

  let initialized = false

  // lifecycle function
  onMount(() => {
    // stores are written to be calling set
    user.set({
      name: 'Test user',

      
      schoolName: 'Test school',
    })
    initialized = true
  })

</script>

<div>
  {#if initialized}
    <Route.default currentRoute="{currentRoute}" />
  {/if}
</div>
