<template>
      
          <VisualizationDashboard v-if="checkedLoggedIn===true" />


</template>

<script>
import VisualizationDashboard from '@/components/VisualizationDashboard.vue'

export default {
components: { VisualizationDashboard },
name: 'UserHome',


computed: {
    checkedLoggedIn() {
      return this.$store.state.auth.user;
    }
 },

}

</script>

<style>

</style>