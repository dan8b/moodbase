<template>
  <h1 class="text-3xl"> Welcome to the moodbase. </h1>

          <VisualizationDashboard v-if="checkedLoggedIn===true" />
          <div v-else> Looks like you haven't collected any data yet </div>
</template>

<script>
import VisualizationDashboard from '@/components/DataVisualizationComponents/VisualizationDashboard.vue'
export default {
components: { VisualizationDashboard },
name: 'UserHome',


computed: {
    checkedLoggedIn() {
      if (this.$store.state.auth.loggedIn===true && this.$store.state.userData.lineChartArrays.calmVals.length>0) { return true}
      return false
   }
},




}

</script>

<style>

</style>