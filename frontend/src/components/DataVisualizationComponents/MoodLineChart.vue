<template>
<div class="container">
    <line-chart :width="800" :height="800" />
</div>
</template>

<script>
import LineChart from '@/components/DataVisualizationComponents/LineChart.vue'
export default {
    name: 'LineChartContainer',
  components: { LineChart },
  data(){
      return {
        //   loaded:false,
        //   chartDataObj:{},
  
        }
      }
  }
  // computed: {
  //     loaded() { return this.$store.state.userData.loaded}
  // },
  //   async mounted()  {
  //       // this.loaded=false

  //       // await this.$store.dispatch('userData/retrieveClickData')
  //       // this.chartDataObj= await this.$store.getters['userData/returnChartData']
        
        
       

  //   }

// }
</script>

<style>

</style>