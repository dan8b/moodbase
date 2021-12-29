<template>
<svg height='40%' width='40%' viewBox='-103 -100 250 250' ref='weightCanvas'>
  <circle cx='0' cy='0' r="1%"/>

<WeightDot v-for='i in propsToPass.numPoints' :key='i'
 :iter='i' :buttName='propsToPass.buttNames[i - 1]' />

<LineBetweenDots v-for='i in propsToPass.numPoints' :key='i'
  :vIndex='i' />

</svg>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import WeightDot from './WeightDot.vue'
import LineBetweenDots from './LineBetweenDots.vue'
export default {
  name: 'Weights',
  components: {
    WeightDot,
    LineBetweenDots
  },
  data () {
    return {
      interval: null
    }
  },
  computed: {
    ...mapState(['butts', ['pathsByVariable']]),
    ...mapGetters({
      propsToPass: 'butts/dataForDotRendering'
    })
  },
  created () {
    this.$store.dispatch('butts/createButts')
  }
}
</script>

<style>

</style>
