<template>
  <text :x='coords.x' :y='coords.y - 5'> {{ buttName }} </text>
  <line x1="0" y1="0" :x2="pathCoords.x" :y2="pathCoords.y" stroke="black" />
  <rect :x="coords.x" :y="coords.y" width="20" height="20" stroke="rgba(0,255,0,0.5)" fill="rgba(0,255,0,0.5)"
  @mousedown='beginPathRender(1)' @mouseup='endPathRender()' />
  <rect :x="coords.x + 21" :y="coords.y" width="20" height="20" stroke="rgba(255,0,0,0.5)" fill="rgba(255,0,0,0.75)"
  @mousedown='beginPathRender(-1)' @mouseup='endPathRender()'  />
</template>

<script>
import WeightFunctions from '@/services/weight.functions.js'
export default {
  name: 'WeightDot',
  props: {
    iter: Number,
    buttName: String
  },
  computed: {
    pathCoords () {
      return this.$store.state.butts.pathByVariable[this.buttName]
    },
    nGon () {
      return this.$store.getters['butts/dataForDotRendering'].numPoints
    },
    coords () {
      return WeightFunctions.polarToCartesian({ iter: this.iter, nGon: this.nGon })
    },
    wiggleRoom () {
      return this.$store.state.butts.wiggleRoom
    }
  },
  watch: {
    wiggleRoom (remaining) {
      if (remaining < 0.001) {
        this.$store.commit('butts/adjustOtherPaths', this.buttName)
      }
    }
  },
  methods: {
    beginPathRender (reverse) {
      this.$store.commit('butts/drawPath', { coordinates: this.coords, vName: this.buttName, shrinkPath: reverse })
    },
    endPathRender () {
      this.$store.commit('butts/completePath')
    }
  }
}
</script>

<style>

</style>
