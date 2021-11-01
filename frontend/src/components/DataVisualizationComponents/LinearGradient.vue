<template>
        <defs>
    <linearGradient id="boxGradient"
        x1=".0" y1="0"
        x2="0" y2="1"
        gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="pink"/>
        <stop offset="1" stop-color="pink" stop-opacity="0"/>
      </linearGradient>
        </defs>
    <rect y="10%" width="100%" height="100%" fill="url(#boxGradient)" />
</template>

<script>
import PlotFunctions from '@/services/plot.functions.js'
export default {
  name: 'LinearGradient',
  props: {
    // quadrant: {
    //     type: String,
    //     required:true
    // },
    // axis: {
    //     type:String,
    //     required:true
    // }
  },
  computed: {
    coordinates () {
      return PlotFunctions.returnGradient({ axis: this.axis, quadrant: this.quadrant })
    },
    color () {
      if (this.axis === 'h') {
        return this.$store.state.currentMoodColors.quadrants[this.quadrant].xColor
      } else {
        return this.$store.state.currentMoodColors.quadrants[this.quadrant].yColor
      }
    }
  }
}
</script>

<style>

</style>
