<template>
<Checkboxes />
</template>

<script>
import Checkboxes from '@/components/Checkboxes.vue'
import {useStore} from 'vuex'
import VisualizationService from '../services/visualization.service';
import {reactive, computed,watch} from 'vue'
import _ from 'lodash';
export default {
  name: "Visualization",
  components: { Checkboxes },
  data() {
    return {
      selectedVisualization:""
    }

  },
  setup() {
      // const visualizationType=computed(() => {})
      const store=useStore();
      function useData(visData) {
          const currentState=reactive({
          vars:computed(() => {return store.state.visToShow})
        })
        watch(() => _.cloneDeep(currentState.vars),() => {
          if(currentState.vars.plot.show===true){ 
            console.log("show the plot")
            store.commit('visToShow/hideNotPlot')
            // const map=VisualizationService.invertCoords(visData)
            // visualizationType=map
          }
          else {
        //  visualizationType="MoodLineGraph";
         return visData    
        }
      })}

      if (store.state.auth.status.loggedIn===true){
        const authUid=store.state.auth.user.id
        VisualizationService.getData('retrieveUserData',authUid).then(data=>{ useData(data)})
      }
  }
}
</script>

<style>

</style>