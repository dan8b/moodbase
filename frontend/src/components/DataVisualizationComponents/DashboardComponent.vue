<template>
  <div class=" flex-wrap">
                <div class="border-2 border-gray-400 border-dashed hover:border-transparent hover:bg-white hover:shadow-xl rounded ">
                    <div class="flex flex-col items-center">
                        <div class="flex-shrink pr-4">
                           
                            <component :is="componentToShow" />
                        </div>
              
            </div>
        
         </div>
    </div>
</template>

<script>
import MoodLineChart from '@/components/DataVisualizationComponents/MoodLineChart.vue'
import ClickMap from '@/components/DataVisualizationComponents/ClickMap.vue'
export default {
    name: 'DashboardComponent',
    components: { MoodLineChart, ClickMap},
    props: ['componentToShow']
}
</script>

<style>

</style>