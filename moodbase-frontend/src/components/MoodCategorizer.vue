<template>
  {{xClassification}}
</template>

<script>
import VisualizationService from '../services/visualization.service'
export default {
    name:'MoodCategorizer',
    props: {
        values:Object,
    },
    data() {
        return{
            xClassification:"",
            yClassification:"",
        }
    },
    mounted() {
        this.xClassification=this.xVal
        VisualizationService.classifyMoodValues([this.xVal,this.yVal])
    }

}
</script>

<style>

</style>