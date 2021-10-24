<template>
    <defs>
    <linearGradient :id="gradId" 
        :x1="coordinates.x1" :y1="coordinates.y1" 
        :x2="coordinates.x2" :y2="coordinates.y2" 
        gradientUnits="objectBoundingBox">
        <stop offset="0" :stop-color="color"/>
        <stop offset="1" :stop-color="color" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <g stroke="#707070" stroke-width="1" :fill="gradUrl" 
        :style="blendMode">
        
        <rect width="30vw" height="30vw" stroke="none"/>
    </g>
    
</template>

<script>
import PlotFunctions from '@/services/plot.functions.js'
export default {
    name:'ColorfulBox',
    props: {
        axis: {
            type:String,
            required:true
        },
        quadrant:{
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
                return this.$store.state.currentMoodColors.quadrants[this.quadrant].data.xColor
            }
            else {
                return this.$store.state.currentMoodColors.quadrants[this.quadrant].data.yColor
            }
        },
        blendMode() {
            let half1="mix-blend-mode: "
            let half2=";isolation:isolate"
            if ( this.axis === "h"){
                return half1+"lighten"+half2
            }
            else{
                return half1+"darken"+half2
            }
        },
        gradId(){
            return "gradient"+this.axis
        },
        gradUrl(){
            return "url(#"+this.gradId+")"
        }
    }
}
</script>

<style>

</style>