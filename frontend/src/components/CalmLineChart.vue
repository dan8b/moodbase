<template>
<div class="container"> 
    <line-chart :height="420" :width="420"
      v-if="loaded"
      :chartdata="chartDataObject"
      :options="options"/>
  </div>
</template>

<script>
import VisualizationService from '../services/visualization.service';
import LineChart from '@/components/LineChart.vue'
export default {
    name: 'LineChartContainer',
  components: { LineChart },
  props: {'variableOfInterest': String,},
  data() {
      
    return {
        tempChartData: {},
        chartDataObject: {
            labels: [],
            datasets: [{ 
                data: [],
                label: "Calm",
                borderColor: "#FF5733",
                fill: false
            }]
        },
        loaded: false,
        options: {
            
                title: {
                    display:  true,
                    text: "Your level of calm over time",
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
            },
        },
    }
},

  async mounted() {
    this.loaded = false
    const uid=this.$store.state.auth.user.id

    try {
        await VisualizationService.getLineChart(uid,"calm")
            .then(res=>res.json())
            .then(data => { this.tempChartData=data })
        this.tempChartData.forEach(entry => {
            this.chartDataObject.labels.push(Date.parse(entry.x))
            this.chartDataObject.datasets[0].data.push(entry.y)
          })
      this.loaded = true
    } catch (e) {
      console.error(e)
        }
    }
}
</script>

<style>

</style>