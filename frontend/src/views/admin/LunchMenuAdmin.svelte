<script>
  import { onMount } from 'svelte'
  import { navigateTo } from 'svelte-router-spa'
  import Icon from 'svelte-awesome'
  import { refresh, times } from 'svelte-awesome/icons'
  import axios from 'axios'
  import { user } from '../../store/stores'

  let lunchWeekList = []
  let loading = true
  let showModal = false

  onMount(async () => {
    try {
      let response = await axios.get(`${process.env.API_ROOT}/api/lunch-week`)
      lunchWeekList = response.data
      await new Promise((wait) => setTimeout(wait, 800))
      // spinner stops
      loading = false
    } catch (e) {
      console.error('Error fetching data')
    }
  })

  const openLunchWeekDetails = (lunchWeek) => {
    const route = `/admin/manage-menus/week-details/${lunchWeek.lunchWeekId}`
    navigateTo(route)
  }

  const deleteLunchWeek = async (lunchWeek) => {
    const lunchWeekId = lunchWeek.lunchWeekId
    try {
      // show the loading spinner and call the delete endpoint
      loading = true
      await axios.delete(
        `${process.env.API_ROOT}/api/lunch-week/${lunchWeekId}`
      )

      // find the index of the passed in lunchWeek and use splice to remove it
      const deletedIndex = lunchWeekList.findIndex(
        (x) => x.lunchWeekId === lunchWeekId
      )
      lunchWeekList.splice(deletedIndex, 1)
      loading = false
    } catch (e) {
      loading = false
      console.error(e)
    }
  }

</script>

<style>
  .clickable {
    cursor: pointer;
  }

</style>

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
    <table class="table">
      <thead>
        <tr>
          <th>Week Of</th>
          <th>Published</th>
          <th></th>
        </tr>
      </thead>
      {#each lunchWeekList as lunchWeek}
        <tr>
          <td
            class="has-text-link clickable"
            on:click="{openLunchWeekDetails(lunchWeek)}">
            {lunchWeek.weekOf}
          </td>
          <td>{lunchWeek.isPublished}</td>
          <td
            class="has-text-danger clickable"
            on:click="{deleteLunchWeek(lunchWeek)}">
            <Icon style="margin-top: 4px;" data="{times}" />
          </td>
        </tr>
      {/each}
    </table>
  {/if}
</div>
