<template>
  <div> Last I heard, you were feeling <ClassificationText 
          :emotionSeverity="currentMood.calm.severity"
          :emotionStatus="currentMood.calm.mood"
        /> and <ClassificationText 
          :emotionSeverity="currentMood.happiness.severity"
          :emotionStatus="currentMood.happiness.mood"
        />.
  </div>
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
        }
    },
}
</script>

<style>

</style>