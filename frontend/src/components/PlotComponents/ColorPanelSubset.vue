<template>    

    <div @click="exitSubsetLayer"> Back </div>

<div class="m-4 text-xl" id="panel">
    <ul v-for="(color,i) in subset" :key="i">
        <ColorPanelButton :colorName=color.colorName :colorHex=color.colorHex />
    </ul>
 </div>
</template>

<script>
import ColorPanelButton from './ColorPanelButton.vue'
export default {
    name: 'ColorPanelSubset',
    components: { ColorPanelButton },
    props:{
        subset:Object
    },
    methods:{
        exitSubsetLayer() {
            this.$store.commit('currentMoodColors/setSubset',null)
            this.$store.commit('currentMoodColors/changeLayer')
        }
    }
}
</script>

<style>

</style>