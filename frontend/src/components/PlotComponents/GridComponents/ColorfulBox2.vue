<template>

<transition leave-active-class="animate__animated animate__fadeOut" >

    <div @click="triggerMove" @mouseenter="hoverOver=!hoverOver" @mouseleave="hoverOver=!hoverOver" :style="box">
        <slot  > </slot>
    </div>   

</transition>

</template>

<script>
import ColorFunctions from '@/services/color.functions.js'
export default {
    name:'ColorfulBox2',
    components:{},
    props: {
        selectionOnly:{
            type:Boolean,
            default:false,
        },
        quadrant: {
            type:String,
            required:true
        },
        x: {
            type:String,
            default:"0%"
        },
        y: {
            type:String,
            default:"0%"
        },
    },
    data() {
        return {
            hoverOver:false,
        }
    },
    computed: {
        lockHover() {
            var lock=false;
            if (this.quadrant===this.$store.state.currentMoodColors.activeQuadrant){
                lock=true
            }
            return lock
        },
        allFill(){
            return this.$store.state.currentMoodColors.variableSelection
        },
        toggleHover() {
            if (this.boxVisibility === false || this.lockHover === true) {
                return false
            }
            else if (this.hoverOver===true || (this.allFill!="" && this.allFill!="hide")){
                return true
            }
            else {
                return false
            }
        },
        box() {
            if (this.toggleHover === true){
                return {
                    '--h':"linear-gradient(to "+this.xDir+this.xColor+")",
                    '--v':"linear-gradient(to "+this.yDir+this.yColor+")",
                    '--border':this.borderVisibility,
                    '--offsetX':this.x,
                    '--offsetY':this.y,
                    }
                }
            else {
                return {
                    '--h':"linear-gradient(to right, white, transparent)",
                    '--v':"linear-gradient(to right, white, transparent)",
                    '--border':this.borderVisibility,
                    '--offsetX':this.x,
                    '--offsetY':this.y,
                }
            }
        },
        boxVisibility() {
            return this.$store.state.currentMoodColors.quadrants[this.quadrant].visibility.showBox
        },
        borderVisibility(){
            if (this.boxVisibility===true){
                return "1px solid black"
            }
            else {
                return "none"
            }
        },
        quadrantStateData(){
            return this.$store.state.currentMoodColors.quadrants
        },
        xColor() {
            const baseColor =this.$store.state.currentMoodColors.colorProfile[this.quadrantStateData[this.quadrant].data.xVar]
            return ColorFunctions.createGradientString(baseColor, [7,100])+baseColor+" 100%"

        },
        yColor() {
            const baseColor = this.$store.state.currentMoodColors.colorProfile[this.quadrantStateData[this.quadrant].data.yVar];
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
            triggerMove() {
                this.lockHover=true
                this.$store.commit('currentMoodColors/animateText',this.quadrant);
                this.$store.commit('currentMoodColors/hideQuadrants',this.quadrant);
            }
        } 
}
</script>

<style scoped>

div {
    position:relative;
    width:20vw;
    height:20vw;
    background: var(--h), var(--v);
    background-blend-mode: multiply;
    border:var(--border);
    right:var(--offsetX);
    top:var(--ofsetY);
    cursor:pointer;
}

</style>