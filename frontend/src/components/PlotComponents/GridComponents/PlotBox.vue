<template>
  <div @click="collectPlotData($event)" :style="gradients" />
</template>

<script>
import PlotFunctions from '@/services/plot.functions.js'
import _ from 'lodash'

export default {
  name: 'PlotBox',
  components: { },
  computed: {
    quadrant() {
      return this.$store.state.currentMoodColors.activeQuadrant
    },
    gradients() {
      return{
      '--h':"linear-gradient(to "+this.xDir+this.xColor+", transparent)",
      '--v':"linear-gradient(to "+this.yDir+this.yColor+", transparent)",
      }      
    },
    xColor() {
        return this.$store.state.currentMoodColors.quadrants[this.quadrant].data.xColor;
    },
    yColor() {
        return this.$store.state.currentMoodColors.quadrants[this.quadrant].data.yColor;
    },
    xDir() {
        if (this.quadrant === "one" || this.quadrant === "three") {
            return "right, "
        }
        else {
            return "left, "
        }
    },
    yDir() {
        if (this.quadrant==="one" || this.quadrant==="two") {
            return "bottom, "
        }
        else {
            return "top, "
        }
    },    
  },
  methods:{

    convertCoordinates(e){      
      const transformed=PlotFunctions.coordinateTransform(e,this.quadrant)
      console.log(PlotFunctions.classifyMoodValues(transformed))
  },
    collectPlotData(e) {
      const transformed = PlotFunctions.coordinateTransform(e,this.quadrant)
      const lineChartData={'happinessVal':transformed.happinessVal,'calmVal':transformed.calmVal}

      const clickMapData={'happinessVal':PlotFunctions.maplerize(transformed.happinessVal,"x"),
      'calmVal':PlotFunctions.maplerize(transformed.calmVal,"y")}
      const payload={'lineChart':lineChartData,'clickMap':clickMapData}
      this.$store.commit('userData/addNewClick',payload)
      PlotFunctions.post(payload,'plot/getplotclick')
      },
    throttleClick:_.throttle(function(e) {this.collectPlotData(e);},1000)
  }
}
</script>

<style scoped>

div {
  background: var(--h), var(--v);
  position:absolute;
  width:90%;
  height:80%;
  z-index:10;
  background-blend-mode: multiply;

}
</style>