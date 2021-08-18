<template>
<div>
  <div class="text-2xl"> First time using moodbase? (Yes | No | Never show me this again) </div>
        <button @click="hideChangePanel">
          <p v-if="likeToChange===true">Click this if you're happy with your current color selections and don't want to see these boxes</p>
        <p  v-else> Click this if you changed your mind about your color selections </p>
      </button>
  <div class="flex-col">
    <div v-if="likeToChange===true" class="px-16 py-4"> 
      <h1 v-if="showPanel===false" class=" text-2xl text-start"> Click on a button to change the color you associate with that emotion.</h1>
        <br>
        <PlotColorPicker /> 

      <div v-if="showPanel===true" class="flex px-32 py-16 ">
          <ColorSelectionPanel />
      </div>
    </div>
      <div  width="50%" height="600px" class="flex flex-row flex-wrap py-4" > 
        <PlotGrid @classified-coordinates="setClassification($event)" /> 
        <RecentClickHistory />
      <!-- <div width="50%" @wheel.prevent="isWheelLocked===true" >
           <ClickMap @unlock-wheel="unlockWheel($event)" @lock-wheel="lockWheel($event)" /> 
        </div> -->
     
        <div v-if="showClassification===true" class="px-32 text-3xl">
           You seem to be feeling {{coordinateClassification.happiness.severity}}
            {{coordinateClassification.happiness.mood}} and {{coordinateClassification.calm.severity}} {{coordinateClassification.calm.mood}}. Click to confirm.
        </div>
      </div>  

        
              
    </div>

</div>
</template>

<script>
import PlotGrid from '@/components/PlotGrid.vue'
import PlotColorPicker from '@/components/PlotColorPicker.vue'
import ColorSelectionPanel from '@/components/ColorSelectionPanel.vue'
// import ClickMap from '@/components/ClickMap.vue'
import RecentClickHistory from '@/components/RecentClickHistory.vue'

export default {
    name:'PlotPage',
    components: {PlotGrid, PlotColorPicker, ColorSelectionPanel, RecentClickHistory},
    data() {
      return {
        initialPlotColors:{},
        showClassification:false,
        coordinateClassification:{},
        isWheelLocked:false,
        likeToChange:true,
      }
    },
    computed: {
  
      showPanel() {
        return this.$store.state.currentMoodColors.panelVisibility;
      },
      currentVariable() {
        return this.$store.state.currentMoodColors.variableSelection;
      },
      hoverClassification() {
        return this.$store.state.moodClassification
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
      setClassification(classification){
        this.coordinateClassification=classification
        this.showClassification=true;
      },
          
      togglePanel(variableToChange){

       this.$store.commit('currentMoodColors/setVariableToChange',variableToChange);
        if (this.showPanel===false) {
          this.$store.state.currentMoodColors.panelVisibility=true
        }
      },
    },
    async mounted(){
      const uid = this.$store.state.auth.user.id
      this.$store.dispatch("currentMoodColors/createInitialState",uid)
    }
}
</script>

<style>

</style>