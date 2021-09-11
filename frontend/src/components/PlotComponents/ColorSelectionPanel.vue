<template> 
<h1 class="justify-self-start text-xl"> which color best describes your mood when you are {{currentVariable}}?</h1>

<div class="container flex flex-row">

<ListOfColors />
<svg v-if="colorDemonstration!=null">
  <rect  width="200" height="200" :fill="colorDemonstration"/>
</svg>

      <button @click="postColorChange" v-if="currentColors.readyForCommit===true" class="px-6 text-xl"> Confirm change </button>
      <button @click="hidePanel" class="px-6 text-xl"> Hide </button>
</div>
</template>

<script>
import PlotFunctions from '@/services/plot.functions.js'
import ListOfColors from '@/components/PlotComponents/ListOfColors.vue'
export default {
    name: 'ColorSelectionPanel',
    components: { ListOfColors },
    props: {
      chosenVariableToChange:String,
    },
    computed:{
      currentVariable(){
        return this.$store.state.currentMoodColors.variableSelection;
      },
      colorDemonstration(){
        return this.$store.state.currentMoodColors.demoColor;
      },
      currentColors(){
        return this.$store.state.currentMoodColors
      },
    },

    methods: {
      hidePanel(){
        this.$store.commit('currentMoodColors/togglePanel')
      },
      postColorChange(){
        const changeDataInfo=this.$store.getters['currentMoodColors/packageChangeData']
        console.log(changeDataInfo)
        PlotFunctions.post(changeDataInfo,'plot/changecolors')
        this.$store.commit('currentMoodColors/togglePanel')
        this.$store.commit('currentMoodColors/changeLayer')
        }
    },

}
</script>

<style>

</style>