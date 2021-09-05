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
        async returnChartData(state){

            const dataObj=
            {
                labels: state.timestamps.map(date => Date.parse(date)),
                datasets: [
                { 
                    data: state.lineChartArrays.happinessVals.map(val => Number(val)),
                    label: "Happiness",
                    borderColor: "#3e95cd",
                    fill: false
                },
                { 
                    data: state.lineChartArrays.calmVals.map(val=> Number(val)),
                    label: "Calm/anxiety",
                    borderColor: "#FF5733",
                    fill: false
                }
            ]
            }
            return dataObj
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
            state.clickMapArrays.happinessVals=arrayData.clickMapHappinessVals;
            state.clickMapArrays.calmVals=arrayData.clickMapCalmVals;
            state.timestamps=arrayData.timestamp
        }

    }
}
