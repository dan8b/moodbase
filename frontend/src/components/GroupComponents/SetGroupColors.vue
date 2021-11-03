<template>
<div class="flexc">
  <div class="flexr">
      <button> Use my colors </button>
      <button @click="changeColors"> Make changes </button>
  </div>
  <div class="flexr">
    <plot-grid-4 />
    <plot-color-picker v-if='newColors'/>
    <color-selection-panel v-if="currentVariable!=''"  />
  </div>
</div>
</template>

<script>
import ColorSelectionPanel from '../PlotComponents/ColorSelectionComponents/ColorSelectionPanel.vue'
import PlotColorPicker from '../PlotComponents/ColorSelectionComponents/PlotColorPicker.vue'
import PlotGrid4 from '../PlotComponents/GridComponents/PlotGrid4.vue'
export default {
  name: 'SetGroupColors',
  components: {
    PlotGrid4,
    PlotColorPicker,
    ColorSelectionPanel
  },
  data () {
    return {
      newColors: false
    }
  },
  methods: {
    changeColors () {
      this.newColors = !this.newColors
    }
  },
  beforeMount () {
    this.$store.commit('plotPage/setDisplayToggleIncrementValue', 2)
  },
  computed: {
    currentVariable () {
      return this.$store.state.plotPage.panelState.variableSelectedForColorChange
    }
  }
}
</script>

<style>

</style>
