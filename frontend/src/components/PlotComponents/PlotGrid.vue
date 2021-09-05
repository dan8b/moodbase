<template>
<div width="600" height="600">
  <svg  width="601" height="601"  @mousemove="getAndClassifyCoordinates">

    <Plotbox  
    @click="throttleClick" :xColorLeft="currentColors.sadColor" 
    :yColorTop="currentColors.calmColor" leftOpacity="1" 
    :xColorRight="currentColors.happyColor" :yColorBottom="currentColors.anxiousColor"
      topOpacity=".7" bottomOpacity="1" rightOpacity=".3" idGradX="topLeftX" idGradY="topLeftY"
      /> 
    
 </svg>
</div>
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

        if(e.target.getBoundingClientRect().height===0){
          return {
            happinessVal:e.clientX-e.target.getBoundingClientRect().x,
            calmVal:0
          }
        }
        else if (e.target.getBoundingClientRect().width===0){
          return {
            happinessVal:0,
            calmVal:e.clientY-e.target.getBoundingClientRect().y
          }
        }
        else{
        return {
            happinessVal:e.clientX-e.target.getBoundingClientRect().x,
            calmVal:e.clientY-e.target.getBoundingClientRect().y
          }
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
        this.$store.dispatch('userData/retrieveClickData')
        },
      throttleClick:_.throttle(function(e)
      {this.collectPlotData(e);},480000)
      }
  }

</script>

<style>

</style>