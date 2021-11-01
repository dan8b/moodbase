<template>
    <div class="flex w-max h-max gap-4">
        <div @click="togglePanel('happiness')">
        <span :style="{'color':currentColors.happiness}"> Happiness </span>
        </div>
        <div @click="togglePanel('sad')">
        <span :style="{'color':currentColors.sadness}"> Sadness </span>
        </div>
        <div @click="togglePanel('calm')">
        <span :style="{'color':currentColors.calm}"> Calm </span>
        </div>
        <div @click="togglePanel('anxious')">
        <span :style="{'color':currentColors.anxiety}"> Anxiety </span>
        </div>

    </div>

</template>

<script>
export default {
  name: 'ColorPickerButton',
  data () {
    return {
      currentVariable: ''
    }
  },
  computed: {
    currentColors () {
      return this.$store.state.currentMoodColors.colorProfile
    }
  },
  methods: {
    togglePanel (variable) {
      if (this.currentVariable === variable) {
        this.$store.commit('currentMoodColors/togglePanel', variable)
      } else {
        this.$store.commit('currentMoodColors/setVariableToChange', variable)
        this.currentVariable = variable
      }
    }
  }

}
</script>

<style>

</style>
