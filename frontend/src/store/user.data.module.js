import PlotFunctions from '@/services/plot.functions.js'

const initialState = {
    lineChartArrays:
        {
            happinessVals:[],
            calmVals:[]
        },
    clickMapArray:[],
    timestamps:[]
}

export const userData = {
    namespaced:true,
    state:initialState,
    getters: {
        returnChartData(state){
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
            state.clickMapArray=arrayData.clickMapVals
            state.timestamps=arrayData.timestamp
        },
        
        addNewClick(state,clickData){
            state.lineChartArrays.happinessVals.push(clickData.lineChart.happinessVal)
            state.lineChartArrays.calmVals.push(clickData.lineChart.calmVal)
            state.clickMapArray.push(clickData.clickMap)    
       },
        
        wipeDataState(state){
            Object.keys(initialState).forEach(key => { state[key]=initialState[key]})

        }

    }
}
