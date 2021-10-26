<template >
<br>
<br>
<div class="center">
        <PlotGrid4 />
</div>
</template>

<script>
import PlotGrid4 from '@/components/PlotComponents/GridComponents/PlotGrid4.vue'


export default {
    name:'PlotPage',
    components: { PlotGrid4},
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
  transform: translate(50%, 0);
  position:fixed;
  margin: auto;
  width: 50vw;
  height: 50vw;
  /* border: 3px solid gray; */
}
</style>