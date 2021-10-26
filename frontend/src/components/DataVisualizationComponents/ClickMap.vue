<template>
      <svg width="70%" height="70%">
        <g>
          <rect width="30vw" height="30vw" stroke="gray" stroke-width="5" fill="none"/>

          <circle cx="25%" cy="25%" r="5%"/>
        </g>
      </svg>
</template>

<script>
export default {
    name: 'ClickMap',
    emits: ['lock-wheel','unlock-wheel'],
    props:{
      isCommunityData:Boolean
    },
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
        var coordinateArray=[]
        if (this.isCommunityData === false){coordinateArray =  this.$store.state.userData.clickMapArray}
        else { coordinateArray = this.$store.state.communityData.clickMap}
        return coordinateArray
      }
    },
}

</script>

<style>

</style>