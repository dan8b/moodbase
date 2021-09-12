<template>
    <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded " 
    width="1000px" height="1000px">                           
        <LineChart :width="1000" :height="1000" />
    </div>
</template>

<script>
import LineChart from '@/components/DataVisualizationComponents/LineChart.vue'
// import ClickMap from '@/components/DataVisualizationComponents/ClickMap.vue'
export default {
    name: 'DashboardComponent',
    components: { LineChart},
    props: ['componentToShow']
}
</script>

<style>

</style>