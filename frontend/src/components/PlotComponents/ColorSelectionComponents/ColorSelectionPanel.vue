<template>
  <div >
  which color best describes {{currentVariable}}?
  <ListOfColors />
  <svg v-if="colorDemonstration!=null">
    <rect  width="200" height="200" :fill="colorDemonstration"/>
  </svg>
</div>

</template>

<script>
import PlotFunctions from '@/services/plot.functions.js'
import ListOfColors from './ListOfColors.vue'
export default {
  name: 'ColorSelectionPanel',
  components: { ListOfColors },
  computed: {
    currentVariable () {
      return this.$store.state.currentMoodColors.variableSelection
    },
    colorDemonstration () {
      return this.$store.state.currentMoodColors.demoColor
    }

  },

  methods: {

    postColorChange () {
      const changeDataInfo = this.$store.getters['currentMoodColors/packageChangeData']
      PlotFunctions.post(changeDataInfo, 'plot/changecolors')
      this.$store.commit('currentMoodColors/togglePanel')
      this.$store.commit('currentMoodColors/changeLayer')
    }

  }

}
</script>

<style scoped>

div {
  width:100%;
  height:80%;
}

</style>
