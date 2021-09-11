<template>
<div :style="classVar">
  <button @click="changeColor" @mouseover="showColorDemonstration"   class="m-1">
      <span  :style="{'color':colorHex}"> {{colorName}}</span></button>
</div>

</template> 

<script>
export default {
    name: 'ColorPanelButton',
    props: {
        colorName:String,
        colorHex:String,
    },
    computed: {
        classVar() {
            return { '--color':this.colorHex}
        },
        variableName(){
            return this.$store.state.currentMoodColors.variableSelection;
        }
    },
    methods: {
        changeColor()
        {
            console.log("butt")
            const colorChoice={variableName:this.variableName,selectedColor:this.colorHex}
            this.$store.commit('currentMoodColors/changeColor',colorChoice);   
        },
        showColorDemonstration(){
            this.$store.commit('currentMoodColors/showColorDemonstration',this.colorHex)
        }
    },

    }
</script>
<style scoped>
#colorbutton{
    display:flex;
    justify-content:center;
    height:40px;
    width:40px;
    background-color:var(--color);
}

</style>