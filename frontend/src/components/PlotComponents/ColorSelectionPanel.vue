<template> 
 <h1 class="justify-self-start text-xl"> which color best describes your mood when you are {{currentVariable}}?</h1>

<div @scroll="testScroll" class="m-4 text-xl" id="panel">

  <ul v-for="(color,i) in this.colorOptions" :key="i">
    <ColorPanelButton :colorName=color.colorName :colorHex=color.colorHex />
    </ul>
  </div>
<svg>
  <rect  width="200" height="200" :fill="colorDemonstration"/>
</svg>

      <button @click="postColorChange" v-if="this.readyForCommit===true" class="px-6 text-xl"> Confirm change </button>
      <button @click="hidePanel" class="px-6 text-xl"> Hide </button>

</template>

<script>
import ColorSelection from '@/services/color.selector.service.js'
import ColorPanelButton from './ColorPanelButton.vue'
export default {
    name: 'ColorSelectionPanel',
    components: {ColorPanelButton },
    props: {
      chosenVariableToChange:String,
    },
    computed:{
      readyForCommit(){
        return this.$store.getters['currentMoodColors/changePendingCommit']
      },
      currentVariable(){
        return this.$store.state.currentMoodColors.variableSelection;
      },
      colorDemonstration(){
        return this.$store.state.currentMoodColors.demoColor;
      },
      currentColor(){
        return this.$store.state.currentMoodColors.colorSelection;
      }
    },
    data() 
    {
        return {
           colorOptions:{},
           originalColor:"",      
         }
      },
    methods: {
      testScroll(e){
                const {target}=e;
            console.log("top "+target.scrollTop)
            console.log("height "+target.scrollHeight)
            console.log("offset "+target.offsetHeight)
      },
      hidePanel(){
        if(this.originalColor!=this.currentColor){
         
          const revertColor={
            variableName:this.currentVariable,
            selectedColor:this.originalColor,
          }
          this.$store.commit('currentMoodColors/changeColor',revertColor)
        }
        this.$store.commit('currentMoodColors/clearSelection')
      },
      postColorChange(){
        const changeDataInfo=this.$store.getters['currentMoodColors/packageChangeData']
        ColorSelection.commitColorChange(changeDataInfo)
        this.$store.commit('currentMoodColors/clearSelection')
      }
    },
    async mounted() {
        this.originalColor=this.$store.state.currentMoodColors.colorSelection;
        this.colorOptions=await ColorSelection.getAvailableChoices().then(res=>res.json())

    }
}
</script>

<style>
#panel {
  height: 500px;
  width:400px;
  overflow-y: scroll;
  scrollbar-width:none;
  
}
::-webkit-scrollbar {
    display: none;
}
</style>