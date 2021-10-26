<template>
  <svg @click="convertCoordinates($event)" x="11vw" width="30vw" height="30vw" >

     <colorful-box axis="v" :quadrant="quadrant"  />

     <colorful-box axis="h"  :quadrant="quadrant" />


  </svg>
</template>

<script>
import PlotFunctions from '@/services/plot.functions.js'
import ColorfulBox from './ColorfulBox.vue'
// import _ from 'lodash'

export default {
  name: 'PlotBox',
  components: { ColorfulBox },
  computed: {
    quadrant() {
      return this.$store.state.currentMoodColors.activeQuadrant
    },
  },
  methods:{

    convertCoordinates(e){      
      
      const xCoordinate = (e.clientX-e.target.getBoundingClientRect().x)
      var xValue = xCoordinate*(7/(e.target.getBoundingClientRect().right-e.target.getBoundingClientRect().x))
  
      const yCoordinate = e.clientY-e.target.getBoundingClientRect().y
      var yValue = 7-yCoordinate*(7/(e.target.getBoundingClientRect().bottom-e.target.getBoundingClientRect().y))

      if (this.quadrant === "one" || this.quadrant === "three") { xValue = -1*xValue}
      if (this.quadrant === "three" || this.quadrant === "four") { yValue = -1*yValue}
      
      console.log(PlotFunctions.classifyMoodValues({happinessVal:xValue,calmVal:yValue}))
      console.log(e)
    },

    // collectPlotData(e) {
    //     const lineChartData={'happinessVal':this.convertCoordinates(e).happinessVal,'calmVal':this.convertCoordinates(e).calmVal}
    //     const clickMapData={'happinessVal':shifted.happinessVal,'calmVal':shifted.calmVal}
    //     const payload={'lineChart':lineChartData,'clickMap':clickMapData}
    //     this.$store.commit('userData/addNewClick',payload)
    //     PlotFunctions.post(payload,'plot/getplotclick')
    //     },
    // throttleClick:_.throttle(function(e) {this.collectPlotData(e);},1000)
  }
}
</script>

<style scoped>
</style>