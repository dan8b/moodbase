import PlotFunctions from '@/services/plot.functions.js'
const initialState = {
    lineChartArrays:
        {
            happinessVals:[],
            calmVals:[]
        },
    clickMapArrays:
    {
        happinessVals:[],
        calmVals:[]
    },
    timestamps:[]
}

export const userData = {
    namespaced:true,
    state:initialState,
    getters: {
        prepareDataForLineChart(){

        }
    },
    actions: {
        async retrieveClickData( { commit }){
            const dataToCommit = await PlotFunctions.getData()
            commit('createClickArray', dataToCommit)
        }
    },
    mutations:{
        createClickArray(state,arrayData) {
            state.lineChartArrays.happinessVals=arrayData.lineChartHappinessVals;
            state.lineChartArrays.calmVals=arrayData.lineChartCalmVals;
            state.clickMapArrays.happinessVals=arrayData.lineChartHappinessVals;
            state.clickMapArrays.calmVals=arrayData.lineChartCalmVals;
        }

    }
}
