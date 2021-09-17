<template>
 <svg width="300" height="300" >

<!-- quadrant 1 -->

  <defs>
    <linearGradient id="linear-gradientAnxious" x1="0.5" y1="1" x2="0.5" y2="-0.045" gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="boxColors.anxious"/>
      <stop offset="1" :stop-color="boxColors.anxious" stop-opacity="0.051"/>
    </linearGradient>
    <linearGradient id="linear-gradientSad" y1="0.517" x2="1.071" y2="0.53" gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="boxColors.sad"/>
      <stop offset="1" :stop-color="boxColors.sad" stop-opacity="0.1"/>
    </linearGradient>
    <linearGradient id="linear-gradientCalm" x1="0.5" x2="0.5" y2="1.021" gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="boxColors.calm"/>
      <stop offset="1" :stop-color="boxColors.calm" stop-opacity="0.1"/>
    </linearGradient>
    <linearGradient id="linear-gradientHappy" x1="1" y1="0.453" x2="-0.121" y2="0.459" gradientUnits="objectBoundingBox">
      <stop offset="0" :stop-color="boxColors.happy"/>
      <stop offset="1" :stop-color="boxColors.happy" stop-opacity="0.1"/>
    </linearGradient>
  </defs>
<svg v-if="quadrant===1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" viewBox="0 0 300 300">

  <defs>

 

  </defs>
    <g id="Rectangle_15" data-name="Rectangle 15" stroke="#707070" stroke-width="1" fill="url(#linear-gradientSad)" style="mix-blend-mode: darken;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>
  <g id="Rectangle_16" data-name="Rectangle 16" stroke="#707070" stroke-width="1" fill="url(#linear-gradientCalm)" style="mix-blend-mode: color;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>
</svg>

<!-- quadrant 2 -->

<svg v-else-if="quadrant===2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" viewBox="0 0 300 300">
  <defs>

  </defs>
  <g id="Rectangle_11" data-name="Rectangle 11" stroke="#707070" stroke-width="1" fill="url(#linear-gradientHappy)" style="mix-blend-mode: lighten;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>

  <g id="Rectangle_12" data-name="Rectangle 12" stroke="#707070" stroke-width="1" fill="url(#linear-gradientCalm)" style="mix-blend-mode: color;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>
</svg> 

<!-- quadrant 3 -->


<svg v-else-if="quadrant===3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" viewBox="0 0 300 300">
  <g id="Rectangle_14" data-name="Rectangle 14" stroke="#707070" stroke-width="1" fill="url(#linear-gradientAnxious)" style="mix-blend-mode: darken;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>
  <g id="Rectangle_14" data-name="Rectangle 14" stroke="#707070" stroke-width="1" fill="url(#linear-gradientSad)" style="mix-blend-mode: color;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>


</svg>



<!-- quadrant 4 -->

<svg v-else-if="quadrant===4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="300" viewBox="0 0 300 300">
  <g id="Rectangle_14" data-name="Rectangle 14" stroke="#707070" stroke-width="1" fill="url(#linear-gradientAnxious)" style="mix-blend-mode: color;isolation: isolate">
    <rect width="300" height="300" stroke="none"/>
    <rect x="0.5" y="0.5" width="299" height="299" fill="none"/>
  </g>
  <g id="Rectangle_14" data-name="Rectangle 14" stroke="#707070" stroke-width="1" fill="url(#linear-gradientHappy)" style="mix-blend-mode: darken;isolation: isolate">
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
      return this.$store.state.currentMoodColors.colorProfile
    }
  }

}
</script>

<style>

</style>