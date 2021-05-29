<script>
  import { onMount } from 'svelte'
  import axios from 'axios'
  import { user } from '../../store/stores'

  let lunchWeekList = []

  onMount(async () => {
    try {
      let response = await axios.get('http://localhost:3000/api/lunch-week')
      lunchWeekList = response.data
    } catch (e) {
      console.error('Error fetching data')
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
  {JSON.stringify(lunchWeekList)}
</div>
