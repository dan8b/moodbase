<template>
<h1 class="text-3xl"> Welcome to the moodbase. </h1>


<div  class=" flex justify-between">

    <DashboardComponent componentToShow="LineChart"/>

</div>

  
                    
</template>

<script>
import DashboardComponent from '@/components/DataVisualizationComponents/DashboardComponent.vue'

export default {
    name: 'VisualizationDashboard',
    components: { DashboardComponent},
    computed: {
        wheelStatus() {
            return this.$store.getters['wheelLock/isWheelLocked']
        }
    },
    methods: {
        unlockWheel(){
            this.$store.commit('wheelLock/unlockWheel')
            }
        },   

}
</script>

<style>

</style>