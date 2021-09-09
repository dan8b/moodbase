<template>
<!-- <div> -->
  <!-- <div class="text-2xl"> First time using moodbase? (Yes | No | Never show me this again) </div>
        <button @click="hideChangePanel">
          <p v-if="likeToChange===true">Click this if you're happy with your current color selections and don't want to see these boxes</p>
        <p  v-else> Click this if you changed your mind about your color selections </p>
      </button>
  <div class="flex-col">
    <div v-if="likeToChange===true" class="px-16 py-4"> 
      <h1 class=" text-2xl text-start"> Click on a button to change the color you associate with that emotion.</h1>
        <br>
    
 -->
    <!-- </div> -->
        <PlotColorPicker /> 
       <div v-if="showPanel===false" class="container flex flex-row space-x-5">
        <PlotGrid /> 
        
        <!-- <ColorSelectionPanel/> -->
        
        <!-- <RecentClickHistory /> -->
      <!-- <div width="50%" @wheel.prevent="isWheelLocked===true" >
           <ClickMap @unlock-wheel="unlockWheel($event)" @lock-wheel="lockWheel($event)" /> 
        </div> -->
     

      </div>  
      
      <div v-if="showPanel===true" class="flex px-32 py-16 ">
          <ColorSelectionPanel />
      </div>

        
              
    <!-- </div>

</div> -->
</template>

<script>
import PlotGrid from '@/components/PlotComponents/PlotGrid.vue'
import PlotColorPicker from '@/components/PlotComponents/PlotColorPicker.vue'
import ColorSelectionPanel from '@/components/PlotComponents/ColorSelectionPanel.vue'
// import RecentClickHistory from '@/components/RecentClickHistory.vue'

export default {
    name:'PlotPage',
    components: {PlotGrid, PlotColorPicker, ColorSelectionPanel},
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
        if (this.showPanel===false) {
          this.$store.state.currentMoodColors.panelVisibility=true
        }
      },
    },


}
</script>

<style>

</style>