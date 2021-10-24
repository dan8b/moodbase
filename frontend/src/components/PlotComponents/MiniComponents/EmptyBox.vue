<template>

 <g  @mouseenter="hover" @mouseleave="unhover" :fill="fill">        
    <transition leave-active-class="animate__animated animate__fadeOut" >

        <rect stroke="#707070" stroke-width="2" width="15vw" height="15vw" 
         :id="quadrantNum" :x="xOffset" :y="yOffset"  v-if="show" >
        </rect>
    
    </transition>
        <slot>      </slot>

</g>

</template>

<script>
export default {
    name: 'EmptyBox',
    data() {
        return {
            fill:"none"
        }
    },
    props: {
        xOffset:{
            type:String,
            default: "0"
        },
        yOffset:{
            type:String,
            default: "0"
        },
        quadrantNum:{
            required:true,
            type:String
        }
    },
    methods: {
        hover(){
            this.fill="gray"
        },
        unhover(){
            this.fill="none"
        }
    },
    computed: {
        show(){
        if (this.$store.state.currentMoodColors.quadrants[this.quadrantNum].visibility.showBox === true){
            return true
            }
        return false
        }
    }
}
</script>

<style>

g:hover{
   background-color: gray;;
}
</style>