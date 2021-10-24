<template>    

    <transition leave-active-class="animate__animated animate__fadeOut" >
    <text v-transition-grid="variable" v-if="show"  font-size="xx-large" font-family="SegoeUI, Segoe UI">
        <tspan background-color="red" :watch="animate" :id="quadrantNum" :fill="fill"  :x="x" :y="y">{{ variable }}</tspan>
    </text>    
    </transition> 
    

</template>

<script>
import Animator from '@/services/animation.service.js'
export default {
    name:'TextElement',
    data() {
        return {
            watch:true
        }
    },
    props:{
        isClassifier:{
            default:false,
            type:Boolean
        },
        fill: {
            default:"black",
            type: String
        },
        variable: {
            required:true,
            type:String
        },
        y: {
            required:true,
            type:String
        },
        x:{
            type:String,
            default:"5%"
        },
        quadrantNum: {
            type:String
        }
    },
    computed: {
        animate() {
            return this.$store.state.currentMoodColors.quadrants[this.quadrantNum].moveText
        },
        xOffset() {
            return this.$store.state.currentMoodColors.quadrants[this.quadrantNum].textTranslation.x
        },
        yOffset() {
            return this.$store.state.currentMoodColors.quadrants[this.quadrantNum].textTranslation.y
        },
        textOffset(){
            return "translate("+this.xOffset+" "+this.yOffset+")"
        },
        show() {
            if (this.isClassifier === true 
                && this.$store.state.currentMoodColors.quadrants[this.quadrantNum].visibility.showClassifier === true) {
                return true
            }
            if (!this.isClassifier && this.$store.state.currentMoodColors.quadrants[this.quadrantNum].visibility.showText === true){
                return true
            }
            return false
        }
    },
    directives: {
        transitionGrid: {
            updated: (el, binding) => {
                const quad = binding.instance.$props.quadrantNum
                if (binding.value==="calm" || binding.value==="anxious"){
                    Animator.shiftX(el,quad)
                }
                else if (binding.value == "happy" || binding.value === "sad"){
                    Animator.shiftY(el,quad)
                }
            }   
        }
    }

}
</script>

<style>

</style>