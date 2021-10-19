<template>
    <div v-if="gridVisible===true" class=" flex flex-col w-max" >
        <div class="flex flex-row ">
            <PlotBox2 
                emotion1="sad"
                emotion2="calm"
                :fill1="boxTextColors.sad"
                :fill2="boxTextColors.calm"
            />
            <PlotBox2 
                emotion1="happy"
                emotion2="calm"
                :fill1="boxTextColors.happy"
                :fill2="boxTextColors.calm"
            />
        </div>
        <div class="flex flex-row">

            <PlotBox2 
                emotion1="sad"
                emotion2="anxious"
                :fill1="boxTextColors.sad"
                :fill2="boxTextColors.anxious"
            />
            <PlotBox2 
                emotion1="happy"
                emotion2="anxious"
                :fill1="boxTextColors.happy"
                :fill2="boxTextColors.anxious"
            />            
        </div>
    </div>
    <button v-else> back </button>

</template>

<script>
import PlotBox2 from './PlotBoxText.vue'
export default {
    name:'PlotGrid2',
    components: { PlotBox2 },
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
        }
    },
    methods: {
        toggleGrid(){

        }
    }
}
</script>

<style>

</style>