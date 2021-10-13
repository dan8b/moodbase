<template>


<div class="px-16 flex flex-col ">
    <div v-if="popularityPanel===true" class=" py-16 flex flex-row space-x-24">
        <ColorPopularityDetails :popularityData="currentPopularityData" />
        <div @click="togglePopularityPanel">Hide </div>
    </div>
    <div  class=" py-16 flex flex-row space-x-24">
        <UserDataOverview />
        <CommunityDataOverview />
    </div>
    <div  class="py-16 flex flex-row space-x-24">
        <LineChartWrapper :isCommunityData="false"/>
        <LineChartWrapper :isCommunityData="true" />
    </div>
    <div class="py-16 flex flex-row w-max space-x-24"  >
        <ClickMap :isCommunityData="false" @wheel.prevent="isWheelLocked===true" @unlock-wheel="unlockWheel($event)" /> 
        <ClickMap :isCommunityData="true" @wheel.prevent="isWheelLocked===true" @unlock-wheel="unlockWheel($event)" /> 
    </div>
</div>

  
                    
</template>

<script>
import CommunityDataOverview from './CommunityDataOverview.vue'
import LineChartWrapper from '@/components/DataVisualizationComponents/LineChartWrapper.vue'
import UserDataOverview from '@/components/DataVisualizationComponents/UserDataOverview.vue'
import ColorPopularityDetails from './ColorPopularityDetails.vue'
import ClickMap from './ClickMap.vue'

export default {
    name: 'VisualizationDashboard',
    components: { LineChartWrapper, ClickMap,UserDataOverview,CommunityDataOverview, ColorPopularityDetails},
    computed: {
        wheelStatus() {
            return this.$store.getters['wheelLock/isWheelLocked']
        },
        popularityPanel() {
            return this.$store.state.currentMoodColors.popularityPanel
        },
        currentPopularityData() {
            return this.$store.state.currentMoodColors.popularityData
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