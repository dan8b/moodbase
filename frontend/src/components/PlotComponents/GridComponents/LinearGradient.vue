<template>
    <linearGradient id="boxGradientHorizontal" 
        :x1="coordinates.x1" :y1="coordinates.y1" 
        :x2="coordinates.x2" :y2="coordinates.y2" 
        gradientUnits="objectBoundingBox">
        <stop offset="0" :stop-color="color"/>
        <stop offset="1" :stop-color="color" stop-opacity="0"/>
      </linearGradient>
</template>

<script>
import PlotFunctions from '@/services/plot.functions.js'
export default {
    name: 'LinearGradient',
    props: {
        quadrant: {
            type: String,
            required:true
        },
        axis: {
            type:String,
            required:true
        }
    },
    computed: {
        coordinates() {
            return PlotFunctions.returnGradient({axis:this.axis, quadrant: this.quadrant})
        },
        color(){
            if (this.axis==="h"){
                return this.$store.state.currentMoodColors.quadrants[this.quadrant].xColor
            }
            else {
                return this.$store.state.currentMoodColors.quadrants[this.quadrant].yColor
            }
        }
    }
}
</script>

<style>

</style>