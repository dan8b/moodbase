<template>
<div class="container"> 
    <line-chart :width="420" :height="420"
      :chartdata="chartData"
      :options="optionsObj"/>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import { ref } from 'vue'
import LineChart from '@/components/DataVisualizationComponents/LineChart.vue'
export default {
    name: 'LineChartContainer',
  components: { LineChart },
    setup()  {
        const store = useStore();
        const chartData = ref(store.dispatch('userData/retrieveClickData'));
        const optionsObj=
        ref({
            labels: [],
            datasets: [{ 
                data: [],
                label: "Happiness",
                borderColor: "#3e95cd",
                fill: false
            },
            { 
                data: [],
                label: "Calm/anxiety",
                borderColor: "#FF5733",
                fill: false
            }],
        options: {
            responsive:false,
   
                title: {
                    display:  true,
                    text: "",
                },

            scales: {
                yAxes: [{
                    scaleLabel: {
                        display:true,
                        labelString: "variable recorded",
                    },
                    ticks: {
                        min: -7,
                        max: +7,
                        stepSize: 1
                        
                    }
                }],
                xAxes: [{
                    scaleLabel:{ 
                        display:true,
                        labelString: "time recorded",
                    },
                    type: 'time',
                }]
            }
        }
    })
    return { optionsObj, chartData}
}
}
</script>

<style>

</style>