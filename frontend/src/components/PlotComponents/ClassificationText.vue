<template>
 <p>
     <span :style="{'color':emotionColor.color}"> {{emotionSeverity}} {{emotionStatus}} </span>
     
</p>
</template>

<script>
import {useStore} from 'vuex'
import {onUpdated, reactive} from 'vue'
export default {
    name: 'ClassificationText',
    props:
    {
        emotionStatus:String,
        emotionSeverity:String,
    },
    setup(props) {
        const store = useStore()
        var emotionColor=reactive({color:""})
        const severityMapping= {
                barely:.07,
                slightly:.14,
                somewhat:.28,
                noticeably:.42,
                quite:.56,
                very:.70,
                extremely:.84,
                incredibly:.98,
            }       
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
        const emotionColorHex=store.state.currentMoodColors.colorProfile[props.emotionStatus]
        const opacityLevel=severityMapping[props.emotionSeverity]
        emotionColor.color=hexToRgbA(emotionColorHex,opacityLevel)

        onUpdated(() =>{
            const emotionColorHex=store.state.currentMoodColors.colorProfile[props.emotionStatus]
            const opacityLevel=severityMapping[props.emotionSeverity]
            emotionColor.color=hexToRgbA(emotionColorHex,opacityLevel)
        })
        return {emotionColor}
    }

}
</script>

<style>

</style>