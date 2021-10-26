<template>
<transition leave-active-class="animate__animated animate__fadeOut" >
    <div v-transition-grid="variable" :watch="animate" v-if="show" :style="tStyle" >{{ variable }}</div>
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

        quadrantNum: {
            type:String
        },
        y: {
            type:String,
            default:"10%"
        }
    },
    computed: {
        animate() {
            return this.$store.state.currentMoodColors.quadrants[this.quadrantNum].moveText
        },
        tStyle() {
            return { '--yOffset':this.y}
        },
        show() {
            return this.$store.state.currentMoodColors.quadrants[this.quadrantNum].visibility.showText;
        }
    },
    directives: {
        transitionGrid: {
            updated: (el, binding) => {
                console.log(el)
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

<style scoped>
div {
    position:relative;
    top: var(--yOffset);
    font-size:xx-large;
    cursor:pointer;
}
</style>