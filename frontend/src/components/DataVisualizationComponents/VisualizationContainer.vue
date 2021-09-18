<template>
<Checkboxes />
</template>

<script>
import {useStore} from 'vuex'
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
            store.commit('visToShow/hideNotPlot')
          }
          else {
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