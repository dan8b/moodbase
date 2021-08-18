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
import HappinessLineChart from '@/components/HappinessLineChart.vue'
import CalmLineChart from '@/components/CalmLineChart.vue'
import MoodLineChart from '@/components/MoodLineChart.vue'
import ClickMap from '@/components/ClickMap.vue'
export default {
    name: 'DashboardComponent',
    components: { HappinessLineChart,CalmLineChart, MoodLineChart, ClickMap},
    props: ['componentToShow']
}
</script>

<style>

</style>