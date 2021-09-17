<template>
    <div class="px-8 border-solid border-4  border-black" width="600" height="600">                           
        <LineChart :chartDataObj="chartData" :width="600" :height="600" />
    </div>
</template>

<script>
import LineChart from '@/components/DataVisualizationComponents/LineChart.vue'

// import ClickMap from '@/components/DataVisualizationComponents/ClickMap.vue'
export default {
    name: 'LineChartWrapper',
    data() {
        return{
            chartData:{}
        }
    },
    components: { LineChart},
    props: {isCommunityData:Boolean},
    created() {
        if (this.isCommunityData===false){
            this.chartData=this.$store.getters['userData/returnChartData']
        }
        else if (this.isCommunityData===true){
            this.chartData=this.$store.getters['communityData/returnChartData']
        }
         

    }
}
</script>

<style>

</style>