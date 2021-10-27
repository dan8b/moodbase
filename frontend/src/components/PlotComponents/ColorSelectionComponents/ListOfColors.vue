<template>
<div id="panel">

    <ul  v-for="(colorCategory,i) in listOptions" :key="i" >
        <div :style="{'color':i}" @click="enterSubsetLayer(i)" v-if="listLayer===0">  {{ i }} </div>
        <ColorPanelSubset v-if="listLayer===1 && currentSubset===i" :subset="colorCategory" />
    </ul>
 </div>
</template>

<script>
import ColorPanelSubset from './ColorPanelSubset.vue'
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
  height: 40%;
  width:100%;
  overflow-y: scroll;
  scrollbar-width:none;
  
}
::-webkit-scrollbar {
    display: none;
}
</style>