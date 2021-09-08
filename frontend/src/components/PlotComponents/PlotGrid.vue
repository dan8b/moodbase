<template>
<div class="flex flex-col w-max " >
    <div class="flex flex-row" @mousemove="getAndClassifyCoordinates">
      <div>
        <Plotbox :quadrant=1 /> 
        <Plotbox :quadrant=3 />
      </div>
      <div>
        <Plotbox :quadrant=2 /> 
        <Plotbox :quadrant=4 />
      </div>
    </div>
    
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
        boxConfig:
        {
          horizontal:"",
          vertical: "",
        }
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
        console.log(e.target.getBoundingClientRect())
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