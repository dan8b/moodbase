<template>
    <div class="py-4" >        
        {{currentVariable}}
        <ul  v-for="(variable,i) in popularityData" :key="i" >
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

export default {
    name: 'ColorPopularityDetails',
    props :{
        popularityData:Array
    },
    computed: {
        currentVariable(){
            return this.$store.state.currentMoodColors.variableSelection
        }
    }
}
</script>

<style>

</style>