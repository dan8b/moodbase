<template>
  <div @click="collectPlotData($event)" :style="gradients" />
</template>

<script>
import PlotFunctions from '@/services/plot.functions.js'
import ColorFunctions from '@/services/color.functions.js'
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
        const baseColor = this.$store.state.currentMoodColors.quadrants[this.quadrant].data.xColor;
        return ColorFunctions.createGradientString(baseColor, [7,100])+baseColor+" 100%"

    },
    yColor() {
        const baseColor = this.$store.state.currentMoodColors.quadrants[this.quadrant].data.yColor;
        return ColorFunctions.createGradientString(baseColor, [7,100])+baseColor+" 100%"

    },
    xDir() {
        if (this.quadrant === "one" || this.quadrant === "three") {
            return "left, "
        }
        else {
            return "right, "
        }
    },
    yDir() {
        if (this.quadrant==="one" || this.quadrant==="two") {
            return "top, "
        }
        else {
            return "bottom, "
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