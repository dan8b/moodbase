<template>
<div class="m-4 text-xl" id="panel">
        <div v-if="listLayer===0" @click="exitPanel"> Back </div>

    <ul  v-for="(colorCategory,i) in listOptions" :key="i" >
        <div :style="{'color':i}" @click="enterSubsetLayer(i)" v-if="listLayer===0">  {{ i }} </div>
        <ColorPanelSubset @click="setColorFamily(colorCategory)" v-if="listLayer===1 && currentSubset===i" :subset="colorCategory" />
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
        exitPanel(){
            this.$store.commit('currentMoodColors/togglePanel')
        },
        enterSubsetLayer(subsetName){
            this.$store.commit('currentMoodColors/setSubset',subsetName)
            this.$store.commit('currentMoodColors/changeLayer')
        },
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