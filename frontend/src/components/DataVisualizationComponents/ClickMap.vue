<template>
  <div>
    <div  class="px-8" tabindex="0" ref="refMap" @mouseleave="unlockWheel" @mouseover="lockWheel">
      <svg @wheel="scrollPoints" width="600px" height="600px" xmlns="http://www.w3.org/2000/svg">
        <circle v-for="(point,i) in coordinateArray" :key="i" :cx="point.happinessVal" :cy="point.calmVal" r="1%"/>
      </svg>
    </div>

  </div> 
 
</template>

<script>
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
            hiddenCoordinates:[],
            displayDate:"",
            mostRecentValue:{},
            isWheelLocked:false,
            wheelEvent:{},
        }
    },
    computed: {
      coordinateArray() {
        return this.$store.state.userData .clickMapArray
      }
    }
}

</script>

<style>

</style>