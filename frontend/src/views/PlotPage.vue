<template>

                 <PlotColorPicker />

       <div  class="container flex flex-row space-x-5">
        <PlotGrid v-if="showPanel===false" /> 
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