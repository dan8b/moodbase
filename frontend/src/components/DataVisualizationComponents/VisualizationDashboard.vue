<template>
<h1 class="text-3xl"> Welcome to the moodbase. </h1>


<div  class=" flex justify-between">
    <UserDataOverview />
    <LineChartWrapper/>

    <div width="50%" @wheel.prevent="isWheelLocked===true" >
           <ClickMap @unlock-wheel="unlockWheel($event)" /> 
    </div>

</div>

  
                    
</template>

<script>
import LineChartWrapper from '@/components/DataVisualizationComponents/LineChartWrapper.vue'
import UserDataOverview from '@/components/DataVisualizationComponents/UserDataOverview.vue'
import ClickMap from './ClickMap.vue'
export default {
    name: 'VisualizationDashboard',
    components: { LineChartWrapper, ClickMap,UserDataOverview},
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