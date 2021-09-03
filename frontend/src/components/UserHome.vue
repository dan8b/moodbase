<template>
      <div v-if="checkedLoggedIn===true"> Butt </div>
          <!-- <VisualizationDashboard v-if="checkedLoggedIn===true" /> -->

</template>

<script>
export default {
// components: { VisualizationDashboard },
name: 'UserHome',


computed: {
    checkedLoggedIn() {
      return this.$store.state.auth.loggedIn;
    }
 },
 mounted(){
   this.$store.dispatch('userData/retrieveClickData')
 }

}

</script>

<style>

</style>