<template>
      
          <VisualizationDashboard v-if="this.$store.state.auth.status.loggedIn===true" />


</template>

<script>
import VisualizationDashboard from '@/components/VisualizationDashboard.vue'

export default {
components: { VisualizationDashboard },
name: 'UserHome',


computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
 },

}

</script>

<style>

</style>