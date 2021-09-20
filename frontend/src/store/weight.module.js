import WeightFunctions from '@/services/weight.functions.js'

const initialState={
    myButts:{},
    interval:null,
    start:0,
    delta:0
}

export const butts = {
    namespaced:true,
    state:initialState,
    actions:{
        createButts( {commit} ){
            WeightFunctions.get('allot/retrieveweightdata')
            .then(res=>res.json())
            .then(data => {
                commit('loadInitialButts',data)
            })
        }
    },
    mutations:{
        loadInitialButts(state,buttsToLoad){
            state.myButts=buttsToLoad
            state.numButts=Object.keys(buttsToLoad).length
        },
        incrementButt(state,buttclick){
            state.start=buttclick.initialValue
            if (buttclick.type===0)
            {
                state.interval=window.setInterval(function() {state.myButts[buttclick.name]++},1000)
            }
            else{
                state.interval=window.setInterval(function() {state.myButts[buttclick.name]--},1000)
            }
        },
        wipeButts(state,buttClickRelease){
            window.clearInterval(state.interval);
            state.interval=null;
            WeightFunctions.post({delta:(buttClickRelease.value-state.start)
                ,name:buttClickRelease.name,value:buttClickRelease.value},'allot/updateweightdata')

        }
    }
}