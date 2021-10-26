<template>

<!-- <transition leave-active-class="animate__animated animate__fadeOut" > -->

    <div @click="triggerMove" @mouseenter="setHover" @mouseleave="setHover" :style="box">
        <slot> </slot>
    </div>   

<!-- </transition> -->

</template>

<script>
export default {
    name:'ColorfulBox2',
    components:{},
    props: {
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
        display:{
            type:String,
            default:""
        }
    },
    data() {
        return {
            toggleHover: false,
        }
    },
    computed: {
        box() {
            if (this.toggleHover){
                return {
                    '--h':"linear-gradient(to "+this.xDir+this.xColor+", transparent)",
                    '--v':"linear-gradient(to "+this.yDir+this.yColor+", transparent)",
                    '--border':this.borderVisibility,
                    '--offsetX':this.x,
                    '--offsetY':this.y,
                    '--display':this.display
                }
            }
            else{
                return {
                    '--h':"linear-gradient(to right, white, transparent)",
                    '--v':"linear-gradient(to right, white, transparent)",
                    '--border':this.borderVisibility,
                    '--offsetX':this.x,
                    '--offsetY':this.y,
                    '--float':this.display
                }
            }
        },
        borderVisibility(){
            if (this.$store.state.currentMoodColors.quadrants[this.quadrant].visibility.showBox===true){
                return "1px solid black"
            }
            else {
                return "none"
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
            setHover() {
                this.toggleHover=!this.toggleHover;
            },
            triggerMove() {
                this.$store.commit('currentMoodColors/animateText',this.quadrant);
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