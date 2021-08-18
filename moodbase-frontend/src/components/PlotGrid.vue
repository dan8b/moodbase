<template>
  <svg  width="600px" height="600px"  @mousemove="getAndClassifyCoordinates">

    <Plotbox  
    @click="throttleClick" :xColorLeft="currentColors.colorProfile.sad" 
    :yColorTop="currentColors.colorProfile.calm" leftOpacity="1" 
    :xColorRight="currentColors.colorProfile.happy" :yColorBottom="currentColors.colorProfile.anxious"
      topOpacity=".7" bottomOpacity=".3" rightOpacity="1" idGradX="topLeftX" idGradY="topLeftY"
      /> 
    
 </svg>
</template>

<script>
import Plotbox from './Plotbox.vue'
import VisualizationService from '@/services/visualization.service'
import _ from 'lodash'
// import { useStore } from 'vuex'
export default {
    name: 'PlotGrid',
     data() {
      return {
        plotData: {
          timeStamp:"",
          x:"",
          y:"",
          shift:300,
          uid:""
        },
        coordinateClassification:{},
      }
    },
    computed: {
    currentUser() {
      return this.$store.state.auth.user;
      },
    currentColors() {
      return this.$store.state.currentMoodColors
    }
    },
    components: {
      Plotbox,
    },
    emits: ['classified-coordinates'],
    methods: {
       getAndClassifyCoordinates(e){
        const translation=e.target.getBoundingClientRect();

        const xRaw=e.clientX-translation.x;
        const yRaw=e.clientY-translation.y;

        const coordinatePair={x:xRaw,y:yRaw}
        this.coordinateClassification=VisualizationService.classifyMoodValues(coordinatePair,false)
        this.$emit('classified-coordinates',this.coordinateClassification)
              },
      collectPlotData(event) {
        this.plotData.timeStamp=(new Date()).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
        const translation=event.target.getBoundingClientRect()
        this.plotData.x=event.clientX-translation.x;
        this.plotData.y=event.clientY-translation.y;
        this.plotData.uid=this.currentUser.id;
        const newPointToAdd={x:this.plotData.x,y:this.plotData.y}
        this.$store.dispatch('plotData/convertPointData', newPointToAdd)
        fetch('http://localhost:5000/api/plotData', {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(this.plotData) // body data type must match "Content-Type" header
            })
            .then(res=>res.json())
        },
      throttleClick:_.throttle(function(e)
      {this.collectPlotData(e);} ,5000)
      }
  }

</script>

<style>

</style>