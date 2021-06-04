<script>
  import { user } from '../../store/stores'
  import { onMount } from 'svelte'
  import axios from 'axios'
  import Icon from 'svelte-awesome'
  import { refresh } from 'svelte-awesome/icons'

  export let currentRoute
  let routeLunchWeekId = currentRoute.namedParams.lunchWeekId
  let lunchWeek = {} // the lunchWeek state variable
  let loading = true

  onMount(async () => {
    try {
      const response = await axios.get(
        `${process.env.API_ROOT}/api/lunch-week/${routeLunchWeekId}`
      )
      lunchWeek = response.data // set the state
      loading = false
    } catch (e) {
      console.error(e)
    }
  })

</script>

<div>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/admin/manage-menus">Lunch Menu Administration</a></li>
      <li class="is-active"><a href="/#">{$user.schoolName}</a></li>
    </ul>
  </nav>
  {#if loading}
    <div class="section">
      <Icon spin data="{refresh}" scale="3" />
    </div>
  {:else}
    <section>{JSON.stringify(lunchWeek)}</section>
  {/if}
</div>
