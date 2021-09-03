<template>
  <svg  width="600px" height="600px"  @mousemove="getAndClassifyCoordinates">

    <Plotbox  
    @click="throttleClick" :xColorLeft="currentColors.sadColor" 
    :yColorTop="currentColors.calmColor" leftOpacity="1" 
    :xColorRight="currentColors.happyColor" :yColorBottom="currentColors.anxiousColor"
      topOpacity=".7" bottomOpacity=".3" rightOpacity="1" idGradX="topLeftX" idGradY="topLeftY"
      /> 
    
 </svg>
</template>

<script>
import Plotbox from './Plotbox.vue'
import PlotFunctions from '@/services/plot.functions.js'
import _ from 'lodash'

export default {
    name: 'PlotGrid',
     data() {
      return {
        coordinateClassification:{},
      }
    },
    computed: {
    currentUser() {
      return this.$store.state.auth.user;
      },
    currentColors() {
      return this.$store.state.currentMoodColors.colorProfile
    }
    },
    components: {
      Plotbox,
    },
    emits: ['classified-coordinates'],
    methods: {
      shiftCoordinates(e){
        return {
          happinessVal:e.clientX-e.target.getBoundingClientRect().x,
          calmVal:e.clientY-e.target.getBoundingClientRect().y
          }
      },
       getAndClassifyCoordinates(e){
        this.coordinateClassification=PlotFunctions.classifyMoodValues(this.shiftCoordinates(e))
        this.$emit('classified-coordinates',this.coordinateClassification)
              },
      collectPlotData(e) {
        const shifted = this.shiftCoordinates(e)
        const transformedCoords=PlotFunctions.transformCoordinates(shifted)
        const lineChartData={'happinessVal':transformedCoords.happinessVal,'calmVal':transformedCoords.calmVal}
        const clickMapData={'happinessVal':shifted.happinessVal,'calmVal':shifted.calmVal}
        const payload={'lineChart':lineChartData,'clickMap':clickMapData}
        PlotFunctions.post(payload,'plot/getplotclick')
        },
      throttleClick:_.throttle(function(e)
      {this.collectPlotData(e);} ,5000)
      }
  }

</script>

<style>

</style>