<template>


<div>
    <div v-if="popularityPanel===true" >
        <ColorPopularityDetails :popularityData="currentPopularityData" />
        <div @click="togglePopularityPanel">Hide </div>
    </div>
    <div >
        <UserDataOverview />
        <CommunityDataOverview />
    </div>

    <div  >
        <ClickMap :isCommunityData="false" @wheel.prevent="isWheelLocked===true" @unlock-wheel="unlockWheel($event)" /> 
        <ClickMap :isCommunityData="true" @wheel.prevent="isWheelLocked===true" @unlock-wheel="unlockWheel($event)" /> 
    </div>
    <UserLineChart :data="chartData" />
</div>

  
                    
</template>

<script>
import UserLineChart from '@/components/DataVisualizationComponents/UserLineChart.vue'
import CommunityDataOverview from './CommunityDataOverview.vue'
import UserDataOverview from '@/components/DataVisualizationComponents/UserDataOverview.vue'
import ColorPopularityDetails from './ColorPopularityDetails.vue'
import ClickMap from './ClickMap.vue'

export default {
    name: 'VisualizationDashboard',
    components: { UserLineChart, ClickMap,UserDataOverview,CommunityDataOverview, ColorPopularityDetails},
    computed: {
        wheelStatus() {
            return this.$store.getters['wheelLock/isWheelLocked']
        },
        popularityPanel() {
            return this.$store.state.currentMoodColors.popularityPanel
        },
        currentPopularityData() {
            return this.$store.state.currentMoodColors.popularityData
        },
        chartData() {
            return this.$store.getters['userData/packageChartData']
        }
    },
    methods: {
        unlockWheel(){
            this.$store.commit('wheelLock/unlockWheel')
            },
        togglePopularityPanel(){
            this.$store.commit('currentMoodColors/toggleDetailPanel',null)
            }
        },   

}
</script>

<style>

</style>