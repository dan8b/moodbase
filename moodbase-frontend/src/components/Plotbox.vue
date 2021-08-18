<template>

    <svg width="600px" height="600px"  v-on:click="checkProp">

      <defs>
        <linearGradient :id=idGradX x1="0%" y1="0" x2="100%" y2="0%">
          <stop offset="0%" :stop-color=xColorLeft :stop-opacity=leftOpacity />
          <stop offset="100%" :stop-color=xColorRight :stop-opacity=rightOpacity />
        </linearGradient>
        <linearGradient :id=idGradY x1="0%" y1="0" x2="0%" y2="100%">
          <stop offset="0%" :stop-color=yColorTop :stop-opacity=topOpacity />
          <stop offset="100%" :stop-color=yColorBottom :stop-opacity=bottomOpacity />
        </linearGradient>
      </defs>

            <rect width="600" height="600" :fill="'url(#' + idGradX + ')'"/>    



            <rect  width="600" height="600" :fill="'url(#' + idGradY + ')'"/>
                                 <line x1="300" y1="0" x2="300" y2="600" style="stroke:rgb(255,255,255);stroke-width:2" />
                     <line x1="0" y1="300" x2="600" y2="300" style="stroke:rgb(255,255,255);stroke-width:2" />



   
    </svg>
</template>

<script>
export default {
    name: 'Plotbox',
    props: {
      xColorLeft: String,
      xColorRight: String,
      yColorTop: String,
      yColorBottom: String,
      leftOpacity: String,
      rightOpacity: String,
      topOpacity: String,
      bottomOpacity: String,
      xOffset: String,
      yOffset: String,
      idGradX: String,
      idGradY: String,
    },
    methods: {
        // getAndClassifyCoordinates(e){
        //   console.log(e)
        // },

    }

}
</script>

<style>

</style>