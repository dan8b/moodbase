<template>
<div :style="classVar">
  <button  @mouseover="showColorDemonstration" @click="changeColor"  class="m-1">{{colorName}}</button>
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
            const colorChoice={variableName:this.variableName,selectedColor:this.colorHex}
            this.$store.commit('currentMoodColors/changeColor',colorChoice);   
            this.$store.commit('currentMoodColors/setColorToChange',this.colorHex);   
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