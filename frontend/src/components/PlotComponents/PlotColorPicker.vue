<template>

<div class=" flex justify-evenly">
  <svg width="804" height="220 " >
    <rect @click="colorPanelVisibility('calm')"  
    id="calm" rx="15" width="200" height="200" :fill="currentColors.calm"/> 
    <text y="216"> {{ currentColors.calm }} </text>
    <rect @click="colorPanelVisibility('happy')"
    id="happy" rx="15" x="201" width="200" height="200" :fill="currentColors.happy"/>
    <rect @click="colorPanelVisibility('anxious')"  
    id="anxious" rx="15" x="401" width="200" height="200" :fill="currentColors.anxious" />
    <rect @click="colorPanelVisibility('sad')"  
    id="sad" rx="15" x="601" width="200" height="200" :fill="currentColors.sad"/>
  </svg>
  <div  class="py-2" v-if="hoverBox===true"> {{ hoverVariable }} , {{ currentColors[hoverVariable]}} </div>
</div>
</template>

<script>
export default {
    name: 'PlotColorPicker',
    data() {
      return{
        hoverBox:false,
        originalColor:"",
        originalVariable:"",
        isPanelVisible:false,
      }
    },
    computed:{
      hoverVariable(){
        return this.$store.state.currentMoodColors.variableSelection;
      },
      classVar() {
            return { '--color':this.boxColor}
        },
      currentColors() {
        return this.$store.state.currentMoodColors.colorProfile
      },

    },
    methods: {
      colorPanelVisibility(variable){
        this.isPanelVisible=this.$store.state.currentMoodColors.panelVisibility
        if (this.isPanelVisible===false){
          this.originalVariable=variable
          this.originalColor=this.currentColors[variable]
          this.isPanelVisible=true;
          this.$store.commit('currentMoodColors/setVariableToChange',variable);
          this.$store.commit('currentMoodColors/setColorToChange',this.originalColor)
          this.$store.state.currentMoodColors.panelVisibility=true
        }
        else{
          if( this.originalVariable!=variable){
            this.originalVariable=variable
            this.originalColor=this.currentColors[variable]
            this.$store.commit('currentMoodColors/setVariableToChange',variable);
          }
          else{
          this.isPanelVisible=false;
          this.$store.state.currentMoodColors.panelVisibility=false;
          const revertColor={
            variableName:variable,
            selectedColor:this.originalColor,
          }
          this.$store.commit('currentMoodColors/changeColor',revertColor)
        }
        }
      },
      showVariableInfo(variable){
        this.variableSelection=variable
        this.hoverBox=true;
      },
      unHover(){
        this.hoverBox=false;
      }
    },
    mounted(){
    }

}
</script>

<style scoped>
#nameBox{
  width:80px;
}
#colorbox{
    display:flex;
    justify-content:center;
    width:80px;
    background-color:var(--color);
}


</style>