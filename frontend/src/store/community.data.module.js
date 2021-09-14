import FetchFunctions from '@/services/fetch.service.js'

const initialState = {
    lineChartArrays:
        {
            averageDailyHappiness:[],
            averageDailyCalm:[],
            totalDailyHappiness:[],
            totalDailyCalm:[]
        },
    clickMapArray:[],
    days:[]
}

export const communityData = {
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
            const dataToCommit = await FetchFunctions.post(true,'/retrieveclickdata')
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