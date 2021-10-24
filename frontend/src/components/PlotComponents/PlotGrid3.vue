<template >
<svg width="300%" height="200%">
    <transition appear-active-class="animate__animated animate__fadeIn animate__slow">
        <plot-box />
    </transition>

    <empty-box  @click="hideGrid($event)" xOffset="11vw" quadrantNum="one" >
            <text-element :isClassifier="true" quadrantNum="one" variable="fart" x="1vw" y="4vw" />
            <text-element quadrantNum="one" :fill="quadrants.one.data.xColor" :variable="quadrants.one.data.xVar" x="12vw" y="4vw" />

            <text-element :isClassifier="true" quadrantNum="one" variable="fart" x="17vw" y="33vw" />
            <text-element quadrantNum="one" :fill="quadrants.one.data.yColor" :variable="quadrants.one.data.yVar" x="12vw" y="8vw" />

    </empty-box>
    
    <empty-box @click="hideGrid($event)" quadrantNum="two" xOffset="26vw"  >
            <text-element :isClassifier="true" quadrantNum="two" variable="fart" x="1vw" y="4vw" />
        
            <text-element quadrantNum="two" :fill="quadrants.two.data.xColor" :variable="quadrants.two.data.xVar" x="27vw" y="4vw" />

            <text-element :isClassifier="true" quadrantNum="two" variable="fart" x="17vw" y="33vw" />

            <text-element quadrantNum="two" :fill="quadrants.two.data.yColor" :variable="quadrants.two.data.yVar" x="27vw" y="8vw" />
    </empty-box>     
             

    <empty-box @click="hideGrid($event)" quadrantNum="three" xOffset="11vw" yOffset="15vw"  >
        <!-- <text-element quadrantNum="one" variable="fart" x="1vw" y="4vw" /> -->
        <text-element quadrantNum="three" :fill="quadrants.three.data.xColor" :variable="quadrants.three.data.xVar" x="12vw" y="19vw" />

        <!-- <text-element quadrantNum="one" variable="fart" x="1vw" y="4vw" /> -->
        <text-element quadrantNum="three" :fill="quadrants.three.data.yColor" :variable="quadrants.three.data.yVar" x="12vw" y="23vw" />
    </empty-box>

    <empty-box @click="hideGrid($event)" quadrantNum="four" xOffset="26vw" yOffset="15vw"  >
        <!-- <text-element quadrantNum="one" variable="fart" x="1vw" y="4vw" /> -->
        <text-element quadrantNum="four" :fill="quadrants.four.data.xColor" :variable="quadrants.four.data.xVar" x="27vw" y="19vw" />
        <!-- <text-element quadrantNum="one" variable="fart" x="1vw" y="4vw" /> -->
        <text-element quadrantNum="four" :fill="quadrants.four.data.yColor" :variable="quadrants.four.data.yVar" x="27vw" y="23vw" />
    </empty-box> 


</svg>

</template>

<script>
import PlotBox from './PlotBox.vue'
import EmptyBox from './MiniComponents/EmptyBox.vue'
import TextElement from './MiniComponents/TextElement.vue'
export default {
    name: 'PlotGrid3',
    components: {EmptyBox, TextElement, PlotBox},
    computed: {
        quadrants() {
            return this.$store.state.currentMoodColors.quadrants
        },
        activeSelected() {
            return this.$store.state.currentMoodColors.activeQuadrant
        }
    },
    methods: {
        hideGrid(e) {
            const quad = e.target.getAttribute('id')
            this.$store.commit('currentMoodColors/hideQuadrants',quad)
        },

     },
     beforeCreate() {
         this.$store.commit('currentMoodColors/initializeGridState')
     },

}

</script>

<style scoped>

.test{
    top:0vw;
    left:0vw;
}


</style>