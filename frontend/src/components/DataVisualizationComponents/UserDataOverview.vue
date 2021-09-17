<template>
  <div class="flex flex-row space-x-2"> 
    <p> Last I heard, you were feeling </p>
    <ClassificationText 
          :readable="true"
          :emotionSeverity="currentMood.calm.severity"
          :emotionStatus="currentMood.calm.mood"
        /> 
        <p>        and </p>
        <ClassificationText 
          :readable="true"
          :emotionSeverity="currentMood.happiness.severity"
          :emotionStatus="currentMood.happiness.mood"
        />
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
        },
    },
}
</script>

<style>

</style>