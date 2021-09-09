<template>
 <svg width="300" height="300" >

<!-- quadrant 1 -->


<svg v-if="quadrant===1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" viewBox="0 0 300 300">
  <defs>
    <radialGradient id="radial-gradientX1" cx="0" cy="1" r="1.588" gradientTransform="translate(-0.701 0.287) rotate(-44.517)" gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="boxColors.sad" />
      <stop offset="1" :stop-color="boxColors.sad" stop-opacity="0.11"/>
    </radialGradient>
  </defs>
  <g id="Rectangle_6" data-name="Rectangle 6" stroke="#707070" stroke-width="1" fill="url(#radial-gradientX1)" style="mix-blend-mode: darken;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>

  <defs>
    <radialGradient id="radial-gradientY1" cx="1" cy="0.02" r="1.4" gradientTransform="translate(1.728 -0.666) rotate(135.568)" gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="boxColors.calm" stop-opacity="0.7"/>
      <stop offset="1" :stop-color="boxColors.calm" stop-opacity="0.051"/>
    </radialGradient>
  </defs>
  <g id="Rectangle_8" data-name="Rectangle 8" stroke="#707070" stroke-width="1" fill="url(#radial-gradientY1)" style="mix-blend-mode: lighten;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>
</svg>

<!-- quadrant 2 -->

<svg v-else-if="quadrant===2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" viewBox="0 0 300 300">
  <defs>
    <radialGradient id="radial-gradientX2" cx="0.979" cy="0.981" r="1.402" gradientTransform="translate(1.012 2.414) rotate(-135.496)" gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="boxColors.happy" stop-opacity=".8"/>
      <stop offset="1" :stop-color="boxColors.happy" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g id="Rectangle_11" data-name="Rectangle 11" stroke="#707070" stroke-width="1" fill="url(#radial-gradientX2)" style="mix-blend-mode: lighten;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>



  <defs>
    <radialGradient id="radial-gradientY2" cx="0" cy="0.02" r="1.4" gradientTransform="translate(0.014 0.006) rotate(44.41)" gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="boxColors.calm" />
      <stop offset="1" :stop-color="boxColors.calm" stop-opacity="0.051"/>
    </radialGradient>
  </defs>
  <g id="Rectangle_12" data-name="Rectangle 12" stroke="#707070" stroke-width="1" fill="url(#radial-gradientY2)" style="mix-blend-mode: darken;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>
</svg> 

<!-- quadrant 3 -->


<svg v-else-if="quadrant===3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" viewBox="0 0 300 300">
  <defs>
    <radialGradient id="radial-gradientX3" cx="0.018" cy="0.02" r="1.388" gradientTransform="matrix(0.708, 0.707, -0.707, 0.708, 0.019, -0.007)" gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="boxColors.sad"/>
      <stop offset="1" :stop-color="boxColors.sad" stop-opacity="0.051"/>
    </radialGradient>
  </defs>
  <g id="Rectangle_9" data-name="Rectangle 9" stroke="#707070" stroke-width="1" fill="url(#radial-gradientX3)" style="mix-blend-mode: darken;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>
  <defs>
    <radialGradient id="radial-gradientY3" cx="1" cy="1" r="1.4" gradientTransform="matrix(-0.696, -0.718, 0.718, -0.696, 0.929, 2.393)" gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="boxColors.anxious"/>
      <stop offset="1" :stop-color="boxColors.anxious" stop-opacity="0.051"/>
    </radialGradient>
  </defs>
  <g id="Rectangle_10" data-name="Rectangle 10" stroke="#707070" stroke-width="1" fill="url(#radial-gradientY3)" style="mix-blend-mode: darken;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>
</svg>

<!-- quadrant 4 -->

<svg v-else-if="quadrant===4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" viewBox="0 0 300 300">
  <defs>
    <radialGradient id="radial-gradientX4" cx="0.979" cy="0.018" r="1.353" gradientTransform="translate(1.687 -0.659) rotate(135.29)" gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="boxColors.happy"/>
      <stop offset="1" :stop-color="boxColors.happy" stop-opacity="0.051"/>
    </radialGradient>
  </defs>
  <g id="Rectangle_13" data-name="Rectangle 13" stroke="#707070" stroke-width="1" fill="url(#radial-gradientX4)" style="mix-blend-mode: lighten;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>

  <defs>
    <radialGradient id="radial-gradientY4" cx="0.031" cy="1" r="1.373" gradientTransform="translate(-0.699 0.316) rotate(-45.122)" gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="boxColors.anxious"/>
      <stop offset="1" :stop-color="boxColors.anxious" stop-opacity="0.051"/>
    </radialGradient>
  </defs>
  <g id="Rectangle_14" data-name="Rectangle 14" stroke="#707070" stroke-width="1" fill="url(#radial-gradientY4)" style="mix-blend-mode: darken;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>
</svg>

</svg>
</template>

<script>
export default {
  name: 'Plotbox',
  props:{
    quadrant: Number,
  },
  computed: {
    boxColors() {
      return this.$store.getters['currentMoodColors/preparePlotBoxes']
    }
  }

}
</script>

<style>

</style>