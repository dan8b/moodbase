<template>
    <div class="py-4" >        
        <ul  v-for="(variable,i) in popularityDetails" :key="i" >
            <div class="border-black border-4 border-solid">{{i}}</div>  
            <div :style="{'color':variable}" class="border-black border-4 border-solid">{{variable}}</div>
            <div class="border-black border-4 border-solid flex flex-row w-128  justify-between ">
                <ul v-for="(subVariable,j) in variable" :key="j">
                    <div :style="{'color':subVariable.value}" class="border-black border-4 border-solid">
                        {{subVariable.value}}
                    </div>
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
    computed: {
        currentVariable() {
            return this.$store.state.currentMoodColors.variableSelection
        }
    },
    async beforeCreate(){
        this.popularityDetails = 
        await ColorFunctions.get('plot/communitycolors/'+this.$store.state.currentMoodColors.variableSelection).then(r=>r.json())
    },
    async updated(){
        this.popularityDetails = 
        await ColorFunctions.get('plot/communitycolors/'+this.$store.state.currentMoodColors.variableSelection).then(r=>r.json())
    }
}
</script>

<style>

</style>