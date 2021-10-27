<template>
<transition leave-active-class="animate__animated animate__fadeOut" >
    <div v-transition-grid="variable" :watch="animate" v-if="showText" :style="tStyle" >{{ variable }}</div>
</transition>
</template>

<script>
import Animator from '@/services/animation.service.js'
export default {
    name:'TextElement',
    data() {
        return {
            watch:true,
            reverse:false,
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
        activeQuadrant(){
            return this.$store.state.currentMoodColors.activeQuadrant
        },
        showText(){
            var show = true;
            if ( this.activeQuadrant!=this.quadrantNum && this.activeQuadrant!="none"){
                show=false;
            }
            return show
        }
    },
    directives: {
        transitionGrid: {
            updated: (el, binding) => {
                const quad = binding.instance.$props.quadrantNum
                if (binding.instance.animate){
                    if (binding.value==="calm" || binding.value==="anxiety"){
                        Animator.shiftX(el,quad)
                    }
                    else if (binding.value == "happiness" || binding.value === "sadness"){
                        Animator.shiftY(el,quad)
                    }
                }
                else{
                    if (binding.value==="calm" || binding.value==="anxiety"){
                        Animator.revertX(el,quad)
                    }
                    else if (binding.value == "happiness" || binding.value === "sadness"){
                        Animator.revertY(el,quad)
                    }                    
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