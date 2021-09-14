<template>
    <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded " 
    width="600" height="600">                           
        <LineChart :width="600" :height="600" />
    </div>
</template>

<script>
import LineChart from '@/components/DataVisualizationComponents/LineChart.vue'
// import ClickMap from '@/components/DataVisualizationComponents/ClickMap.vue'
export default {
    name: 'LineChartWrapper',
    components: { LineChart},
    props: ['componentToShow']
}
</script>

<style>

</style>