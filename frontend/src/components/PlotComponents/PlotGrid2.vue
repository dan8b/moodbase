<template>
    <div class=" flex flex-col w-max" >
        <div class="flex flex-row ">
            <PlotBoxText 
                v-if="currentQuadrant===0 || currentQuadrant===1"
                quadrant=1
                emotion1="sad"
                emotion2="calm"
                :fill1="boxTextColors.sad"
                :fill2="boxTextColors.calm"
            />
            <PlotBoxText 
                v-if="currentQuadrant===0 || currentQuadrant===2"            
                quadrant=2
                emotion1="happy"
                emotion2="calm"
                :fill1="boxTextColors.happy"
                :fill2="boxTextColors.calm"
            />
        </div>
        <div class="flex flex-row">

            <PlotBoxText 
                v-if="currentQuadrant===0 || currentQuadrant===3"
                quadrant=3
                emotion1="sad"
                emotion2="anxious"
                :fill1="boxTextColors.sad"
                :fill2="boxTextColors.anxious"
            />
            <PlotBoxText
                v-if="currentQuadrant===0 || currentQuadrant===4"            
                quadrant=4
                emotion1="happy"
                emotion2="anxious"
                :fill1="boxTextColors.happy"
                :fill2="boxTextColors.anxious"
            />            
        </div>
    </div>

        <!-- <PlotBoxData /> -->
        <button @click="toggleGrid()"> back </button>


</template>

<script>
import PlotBoxText from './PlotBoxText.vue'
// import PlotBoxData from './PlotBoxData.vue'
export default {
    name:'PlotGrid2',
    components: { PlotBoxText, },
    data() {
        return {
            showGrid:true
        }
    },
    computed: {
        boxTextColors() {
            return this.$store.state.currentMoodColors.colorProfile
        },
        gridVisible() {
            return this.$store.state.currentMoodColors.gridVisibility
        },
        currentQuadrant() {
            return this.$store.state.currentMoodColors.holdForBox.quadrant
        }
    },
    methods: {
        toggleGrid(){
            this.$store.commit('currentMoodColors/toggleGridVisibility')

        }
    }
}
</script>

<style scoped>


</style>