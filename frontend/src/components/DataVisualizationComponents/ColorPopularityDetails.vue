<template>
    <div class="py-4" > 
        <h1 class="w-52"> Color (family) popularity rankings for   </h1>
        <ul  v-for="(dataPair,i) in popularColorData" :key="i" >
            <div class="border-black border-4 border-solid flex flex-row w-52  justify-between ">
                <div class="w-32">{{i}}</div>
                <div class="w-32" :style="{'background-color':dataPair.mostPopularFamily}"> </div>
                <div class="w-32">{{dataPair.popularityCount}}</div>
            </div>
        </ul>
        <h1 class="text-sm w-52"> Hover over a color for more detail </h1>
    </div></template>

<script>
import ColorFunctions from '@/services/color.functions.js'
export default {
    name: 'ColorPanelDetails',
    async setup(){
        const test = await ColorFunctions.get('plot/communitycolors').then(r=>r.json())
        console.log(test)
    }
}
</script>

<style>

</style>