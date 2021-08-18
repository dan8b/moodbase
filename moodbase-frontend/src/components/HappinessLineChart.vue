<template>
<div class="container"> 
    <line-chart :width="420" :height="420"
      v-if="loaded"
      :chartdata="chartDataObject"
      :options="options"/>
  </div>
</template>

<script>
import VisualizationService from '../services/visualization.service';
import LineChart from '@/components/LineChart.vue'
export default {
    name: 'HappinessLineChart',
  components: { LineChart },
  data() {
      
    return {
        tempChartData: {},
        chartDataObject: {
            labels: [],
            datasets: [{ 
                data: [],
                label: "Happiness",
                borderColor: "#3e95cd",
                fill: false
            }]
        },
        loaded: false,
        options: {
            
                title: {
                    display:  true,
                    text: "Your happiness over time",
                },

            scales: {
                yAxes: [{
                    scaleLabel: {
                        display:true,
                        labelString: "Happiness",
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
        await VisualizationService.getLineChart(uid,"happy")
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