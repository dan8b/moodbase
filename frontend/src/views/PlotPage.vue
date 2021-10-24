<template >
<br>
<br>
<div class="center">
        <PlotGrid3 />
</div>
</template>

<script>
import PlotGrid3 from '@/components/PlotComponents/PlotGrid3.vue'


export default {
    name:'PlotPage',
    components: { PlotGrid3},
    data() {
      return {
        isWheelLocked:false,
        likeToChange:true,
        listOfColors:{}
      }
    },
    computed: {
      showPanel() {
        return this.$store.state.currentMoodColors.panelVisibility
      }
    },
    methods:{
      hideChangePanel() {
        if (this.likeToChange===false){this.likeToChange=true}
        else{this.likeToChange=false;}
      },
      unlockWheel(lockedStatus){
        this.isWheelLocked=lockedStatus;
      },
      lockWheel(lockedStatus){
        this.isWheelLocked=lockedStatus;
      },
        
      togglePanel(variableToChange){
        this.$store.commit('currentMoodColors/togglePanel',variableToChange)
        this.$store.commit('currentMoodColors/setVariableToChange',variableToChange);
      },
    },


}
</script>

<style>

.center {

  position:relative;
  margin: auto;
  width: 50vw;
  height: 50vw;
  /* border: 3px solid gray; */
}
</style>