<template>
<div @scroll="testScroll" class="m-4 text-xl" id="panel">

    <ul v-for="(color,i) in listOptions" :key="i">
        <ColorPanelButton :colorName=color.colorName :colorHex=color.colorHex />
    </ul>
 </div>
</template>

<script>
import ColorPanelButton from '@/components/PlotComponents/ColorPanelButton.vue'
export default {
    name:'ListOfColors',
    components: {ColorPanelButton},
    computed: {
        listOptions(){
            return this.$store.state.currentMoodColors.listOfColors
        }
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