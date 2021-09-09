<template>
 <p>
     <span :style="{'color':emotionColor}"> {{emotionSeverity}} {{emotionStatus}} </span>
     
</p>
</template>

<script>


export default {
    name: 'ClassificationText',
    props:
    {
        emotionStatus:String,
        emotionSeverity:String,
    },
    data(){
        return{
            emotionColor:"",
            severityMapping: {
                barely:.07,
                slightly:.14,
                somewhat:.28,
                noticeably:.42,
                quite:.56,
                very:.70,
                extremely:.84,
                incredibly:.98,
            }
        }
    },
    updated(){
        function hexToRgbA(hex,opacity){
            var c;
            if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                c= hex.substring(1).split('');
                if(c.length== 3){
                    c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c= '0x'+c.join('');
                return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opacity+')';
            }
            throw new Error('Bad Hex');
        }

        
        const emotionColorHex=this.$store.state.currentMoodColors.colorProfile[this.emotionStatus]
        const opacityLevel=this.severityMapping[this.emotionSeverity]
        this.emotionColor=hexToRgbA(emotionColorHex,opacityLevel)
    }

}
</script>

<style>

</style>