<template>
      <div v-if="checkedLoggedIn===true"> Butt </div>
          <!-- <VisualizationDashboard v-if="checkedLoggedIn===true" /> -->

</template>

<script>
// import VisualizationDashboard from '@/components/VisualizationDashboard.vue'
export default {
// components: { VisualizationDashboard },
name: 'UserHome',


computed: {
    checkedLoggedIn() {
      return this.$store.state.auth.loggedIn;
    }
 },

}

</script>

<style>

</style>