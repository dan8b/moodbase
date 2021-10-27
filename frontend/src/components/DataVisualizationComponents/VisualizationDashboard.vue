<template>
<div class="dashboard">
        <UserDataOverview />
        <div class="dashboardContainer"> 
        <UserLineChart :data="chartData" />
        </div>

    <!-- <div v-if="popularityPanel===true" >
        <ColorPopularityDetails :popularityData="currentPopularityData" />
        <div @click="togglePopularityPanel">Hide </div>
    </div> -->
        <!-- <CommunityDataOverview /> -->

    <!-- <div  >
        <ClickMap :isCommunityData="false" @wheel.prevent="isWheelLocked===true" @unlock-wheel="unlockWheel($event)" /> 
        <ClickMap :isCommunityData="true" @wheel.prevent="isWheelLocked===true" @unlock-wheel="unlockWheel($event)" /> 
    </div> -->
</div>
  
                    
</template>

<script>
import UserLineChart from '@/components/DataVisualizationComponents/UserLineChart.vue'
// import CommunityDataOverview from './CommunityDataOverview.vue'
import UserDataOverview from '@/components/DataVisualizationComponents/UserDataOverview.vue'
// import ColorPopularityDetails from './ColorPopularityDetails.vue'
// import ClickMap from './ClickMap.vue'

export default {
    name: 'VisualizationDashboard',
    components: { UserLineChart, UserDataOverview},
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

<style scoped>


.dashboard{
    width:100vw;
    height:90vw;
}


div {
    color:rgb(0, 0, 0);
}


</style>