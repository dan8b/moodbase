<template>
<div class="m-4 text-xl" id="panel">

    <ul  v-for="(colorCategory,i) in listOptions" :key="i" >
        <div :style="{'color':nameToColor(i)}" @click="enterSubsetLayer(i)" v-if="listLayer===0">  {{ i }} </div>
        <ColorPanelSubset v-if="listLayer===1 && currentSubset===i" :subset="colorCategory" />
    </ul>
 </div>
</template>

<script>
import ColorPanelSubset from '@/components/PlotComponents/ColorPanelSubset.vue'
export default {
    name:'ListOfColors',
    components: {ColorPanelSubset},
    computed: {
        listOptions(){
            return this.$store.state.currentMoodColors.listOfColors
        },
        listLayer(){
            return this.$store.state.currentMoodColors.listLayer
        },
        currentSubset(){
            return this.$store.state.currentMoodColors.currentSubset
        },

    },
    methods: {
        enterSubsetLayer(subsetName){
            this.$store.commit('currentMoodColors/setSubset',subsetName)
            this.$store.commit('currentMoodColors/changeLayer')
        },
        nameToColor(categoryName){
            return categoryName.slice(0,-1)
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