<template>
<div class="flex flex-col w-max " >
    <div class="flex flex-row" @click="collectPlotData" @mousemove="getAndClassifyCoordinates">
      <div>
        <Plotbox :quadrant=1 /> 
        <Plotbox :quadrant=3 />
      </div>
      <div>
        <Plotbox :quadrant=2 /> 
        <Plotbox :quadrant=4 />
      </div>
    </div>
  <div v-if="classifying===true" class="text-2xl">
    Looks like you're feeling 
        <ClassificationText 
          :emotionSeverity="coordinateClassification.calm.severity"
          :emotionStatus="coordinateClassification.calm.mood"
        />
        and
        <ClassificationText 
          :emotionSeverity="coordinateClassification.happiness.severity"
          :emotionStatus="coordinateClassification.happiness.mood"
        />
   
  </div>
 </div>
</template>

<script>
import Plotbox from './PlotBoxData.vue'
import ClassificationText from './ClassificationText.vue'
import PlotFunctions from '@/services/plot.functions.js'
import _ from 'lodash'

export default {
    name: 'PlotGrid',
     data() {
      return {
        coordinateClassification:{},
        classifying:false,
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
      ClassificationText
    },
    // emits: ['classified-coordinates'],
    methods: {
      shiftCoordinates(e){
        this.classifying=true
    
        return {
            happinessVal:e.clientX-((e.target.getBoundingClientRect().x)%300),
            calmVal:e.clientY-((e.target.getBoundingClientRect().y)%300)
          }
      },
       getAndClassifyCoordinates(e){
        this.coordinateClassification=PlotFunctions.classifyMoodValues(this.shiftCoordinates(e))
          },
      collectPlotData(e) {
        const shifted = this.shiftCoordinates(e)
        const transformedCoords=PlotFunctions.transformCoordinates(shifted)
        const lineChartData={'happinessVal':transformedCoords.happinessVal,'calmVal':transformedCoords.calmVal}
        const clickMapData={'happinessVal':shifted.happinessVal,'calmVal':shifted.calmVal}
        const payload={'lineChart':lineChartData,'clickMap':clickMapData}
        this.$store.commit('userData/addNewClick',payload)
        PlotFunctions.post(payload,'plot/getplotclick')
        },
      throttleClick:_.throttle(function(e)
      {this.collectPlotData(e);},1000)
      }
  }

</script>

<style>

</style>