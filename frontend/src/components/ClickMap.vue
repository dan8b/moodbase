<template>
  <br>
  <div>
    <div  class="px-8" tabindex="0" ref="refMap" @mouseleave="unlockWheel" @mouseover="lockWheel">
      <svg @wheel="scrollPoints" width="600px" height="600px" xmlns="http://www.w3.org/2000/svg">
        <circle v-for="(point,i) in this.coordinateArray" :key="i" :cx="point.x" :cy="point.y" r="1%"/>
      </svg>
    </div>

  </div>
 
</template>

<script>
import VisualizationService from '../services/visualization.service';
export default {
    name: 'ClickMap',
    emits: ['lock-wheel','unlock-wheel'],
    methods: {
      lockWheel(){
        this.isWheelLocked=true;
        this.$emit('lock-wheel',this.isWheelLocked)
      },
      unlockWheel(){
        this.isWheelLocked=false;
        this.$emit('unlock-wheel',this.isWheelLocked)
      },
      scrollPoints(e){
        // scroll up to load more points
        if (e.deltaY<0 && this.hiddenCoordinates.length>0) 
          {
            this.coordinateArray.push(this.hiddenCoordinates.shift())
            this.lastIndex+=1;
          }
        //scroll down to load fewer points
        else if (e.deltaY>0 && this.coordinateArray.length>0){
          this.hiddenCoordinates.unshift(this.coordinateArray.pop());
          this.lastIndex-=1;
            }
      }
    },

    data() {
        return {
            uid:"",
            hiddenCoordinates:[],
            coordinateArray:[],
            displayDate:"",
            mostRecentValue:{},
            isWheelLocked:false,
            wheelEvent:{},
        }
    },
 async mounted() {
    this.loaded = false
    const uid=this.$store.state.auth.user.id

    try {
  await VisualizationService.getClickMap(uid)
  .then(res=>res.json())
  .then(data => {
    this.coordinateArray=data
})
  this.coordinateArray.forEach(coordinatePair => {
      this.coordinateArray[coordinatePair]={x:Math.trunc(coordinatePair.x),y: Math.trunc(coordinatePair.y),z:coordinatePair.z}
  })
      this.mostRecentValue=this.coordinateArray.length-1
    } catch (e) {
      console.error(e)
        }
    }
}

</script>

<style>

</style>