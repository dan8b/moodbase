<template>
<h1>
Last I heard, you were feeling 
    <ClassificationText 
          :readable="true"
          :emotionSeverity="currentMood.calm.severity"
          :emotionStatus="currentMood.calm.mood"
        /> 
           and 
        <ClassificationText 
          :readable="true"
          :emotionSeverity="currentMood.happiness.severity"
          :emotionStatus="currentMood.happiness.mood"
        />
</h1>
</template>

<script>
import ClassificationText from '@/components/PlotComponents/ClassificationText.vue'
export default {
    name:'UserDataOverview',
    components: {ClassificationText},
    computed: {
        currentMood()
        {
            return this.$store.getters['userData/returnMostRecent'];
        },
    },
}
</script>

<style>

</style>