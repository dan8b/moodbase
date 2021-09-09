<template>
<h1 class="text-3xl"> Welcome to the moodbase. </h1>


<div  class=" flex justify-between">

    <DashboardComponent/>

    <div width="50%" @wheel.prevent="isWheelLocked===true" >
           <ClickMap @unlock-wheel="unlockWheel($event)" @lock-wheel="lockWheel($event)" /> 
    </div>

</div>

  
                    
</template>

<script>
import DashboardComponent from '@/components/DataVisualizationComponents/DashboardComponent.vue'
import ClickMap from './ClickMap.vue'
export default {
    name: 'VisualizationDashboard',
    components: { DashboardComponent, ClickMap },
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