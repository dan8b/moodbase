<template>
    <div class="py-4" >        
        <ul  v-for="(variable,i) in popularityDetails" :key="i" >
            <div class="border-black border-4 border-solid flex flex-row w-128  justify-between ">
                <ul v-for="(subVariable,j) in variable" :key="j">
                    <div class="border-black border-4 border-solid">{{subVariable}}</div>
                    <div class="border-black border-4 border-solid">{{j}}</div>  
                    
                <!-- <div class="w-32" :style="{'background-color':popularityDetails._id}"> </div> -->
                <!-- <div class="w-32">{{dataPair.popularityCount}}</div> -->
                </ul>
            </div>
        </ul> 
    </div>
</template>

<script>
import ColorFunctions from '@/services/color.functions.js'
export default {
    name: 'ColorPopularityDetails',
    data() {
        return {
            popularityDetails:[]
        }
    },
    async beforeCreate(){
        this.popularityDetails = 
        await ColorFunctions.get('plot/communitycolors/'+this.$store.state.currentMoodColors.variableSelection).then(r=>r.json())
}
}
</script>

<style>

</style>