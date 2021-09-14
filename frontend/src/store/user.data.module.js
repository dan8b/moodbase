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
        returnMostRecent(state){
            const recentHappy = state.lineChartArrays.happinessVals.pop()
            state.lineChartArrays.happinessVals.push(recentHappy)
            const recentCalm = state.lineChartArrays.calmVals.pop()
            state.lineChartArrays.happinessVals.push(recentCalm)
            const toBucket = {
                x:{
                    magnitude:Math.round(Math.abs(recentHappy)),
                    sign:Math.sign(recentHappy)
                },
                y:{
                    magnitude:Math.round(Math.abs(recentCalm)),
                    sign:Math.sign(recentCalm)
                }
            }
            return PlotFunctions.bucketMood(toBucket)
        },
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
            const dataToCommit = await PlotFunctions.get('plot/retrieveclickdata/false').then(response=>response.json())
            commit('createClickArray', dataToCommit)
        }
    },
    mutations:{
        createClickArray(state,arrayData) {
            state.lineChartArrays.happinessVals=arrayData.lineChart.lineChartHappinessVals;
            state.lineChartArrays.calmVals=arrayData.lineChart.lineChartCalmVals;
            state.clickMapArray=arrayData.clickMapVals
            state.timestamps=arrayData.timestamp
        },
        
        addNewClick(state,clickData){
            console.log(clickData)
            state.lineChartArrays.happinessVals.push(clickData.lineChart.happinessVal)
            state.lineChartArrays.calmVals.push(clickData.lineChart.calmVal)
            state.clickMapArray.push(clickData.clickMap)    
       },
        
        wipeDataState(state){
            Object.keys(initialState).forEach(key => { state[key]=initialState[key]})

        }

    }
}
