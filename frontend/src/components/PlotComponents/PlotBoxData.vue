<template>
 <svg width="300" height="300" >

  <defs>

    <!-- for the horizontal layer box -->
    <linearGradient id="boxGradientHorizontal" 
      :x1="coords.horizontal[0]" :y1="coords.horizontal[1]" 
      :x2="coords.horizontal[2]" :y2="coords.horizontal[3]" 
      gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="color.horizontal"/>
      <stop offset="1" :stop-color="color.horizontal" stop-opacity="0"/>
    </linearGradient>

    <!-- vertical layer box -->
    <linearGradient id="boxGradientHorizontal" 
      :x1="coords.vertical[0]" :y1="coords.vertical[1]" 
      :x2="coords.vertical[2]" :y2="coords.vertical[3]" 
      gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="color.vertical"/>
      <stop offset="1" :stop-color="color.vertical" stop-opacity="0"/>
    </linearGradient>
  </defs>

    <g id="Horizontal_Box" data-name="Horizontal Box" stroke="#707070" 
        stroke-width="1" fill="url(#boxGradientHorizontal)" style="mix-blend-mode: darken;isolation: isolate">
      <rect width="300" height="300" stroke="none"/>
      <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
    </g>

      <g id="Vertical_Box" data-name="Vertical Box" stroke="#707070" 
        stroke-width="1" fill="url(#boxGradientVertical)" style="mix-blend-mode: darken;isolation: isolate">
      <rect width="300" height="300" stroke="none"/>
      <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
    </g>

</svg>
</template>

<script>
export default {
  name: 'Plotbox',
  props:{
    coords: {
      required: true,
      type: Object
    },
    color:{
      required: true,
      type: Object
    }
  },
  computed: {
    boxColors() {
      return this.$store.state.currentMoodColors.colorProfile
    }
  }

}
</script>

<style>

</style>