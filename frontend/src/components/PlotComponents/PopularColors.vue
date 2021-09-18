<template>
    <div class="py-4" > 
        <h1 class="w-52"> Right now, the community's emotions look like... </h1>
        <ul  v-for="(dataPair,emotion) in popularColorData" :key="emotion" >
            <div @mouseover="showDetails(emotion)" class="border-black border-4 border-solid flex flex-row w-52  justify-between ">
                <div class="w-32">{{emotion}}</div>
                <div class="w-32" :style="{'background-color':dataPair.mostPopularFamily}"> </div>
                <div class="w-32">{{dataPair.popularityCount}}</div>
            </div>
        </ul>
        <h1 class="text-sm w-52"> Hover over a color for more detail </h1>
    </div>
</template>

<script>
import ColorFunctions from '@/services/color.functions.js'
export default {
    name: 'PopularColors',
    data() {
        return {
            popularColorData:{},
            popularityDetails:{}
        }
    },
      methods:{
        showDetails(emotion){
        this.$store.commit('currentMoodColors/togglePanel',emotion)
    }
    },
    async beforeCreate(){
        this.popularColorData = await ColorFunctions.get('plot/popularcolors').then(response=>response.json())
    }
}
</script>

<style>

</style>