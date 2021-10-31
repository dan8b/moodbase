<template >

<div class="flexrp">
  <transition enter-active-class="animate__animated animate__slideInUp fast">

  <div class="flexc">
    <PlotColorPicker  v-if="quadrantSelected==='none'" />

    <color-selection-panel v-if="currentVariable!=''"  />

    
  </div>
  </transition>

  <div class="center">
      <PlotGrid4 :userColorMode="true" />
    
    <transition enter-active-class="animate__animated animate__fadeIn" >
        <!-- div enters data collection mode; at this point -->
      <plot-box v-if="showDataBox" />
    
    </transition>
  </div>
</div>

</template>

<script>
import PlotBox from '@/components/PlotComponents/GridComponents/PlotBox'
import ColorSelectionPanel from '@/components/PlotComponents/ColorSelectionComponents/ColorSelectionPanel.vue'
import PlotGrid4 from '@/components/PlotComponents/GridComponents/PlotGrid4.vue'
import PlotColorPicker from '@/components/PlotComponents/ColorSelectionComponents/PlotColorPicker.vue'

export default {
    name:'PlotPage',
    components: { PlotGrid4, PlotColorPicker, ColorSelectionPanel, PlotBox},
    beforeCreate(){
      this.$store.dispatch('plotPage/retrieveUserColorChoices')
    },
    computed: {
      showDataBox(){
        if (this.quadrantSelected!="") {
          return true
        }
        else{
          return false
        }
      },
      quadrantSelected(){
        return this.$store.state.plotPage.activeQuadrant
      },
      currentVariable(){
        return this.$store.state.plotPage.variableSelectedForColorChange
      },
    },
}
</script>

<style>

.flexrp{
  position:fixed;
  transform: translate(30%, 0);  
  display:flex;
  margin:0;
  padding:0;
  flex-direction:row;
  overflow:visible;
}

.center {
  transform: translate(50%, 0);
  position:fixed;
  margin: auto;
  width: 50vw;
  height: 50vw;
  /* border: 3px solid gray; */
}

/* .flexc{
  display:flex;
  margin:0;
  padding:0;
  flex-direction:column;
} */
</style>