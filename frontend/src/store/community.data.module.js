import PlotFunctions from '@/services/plot.functions.js'

const initialState = {
    dayList:[],
    clickMap:[],
    averageLineChartHappiness:[],
    averageLineChartCalm:[],
    totalHappinessByDay:[],
    totalCalmByDay:[],
    clickCount:0

}

export const communityData = {
    namespaced:true,
    state:initialState,
    getters: {
        returnChartData(state){
            const dataObj=
            {
                labels: state.dayList.map(date => Date.parse(date)),
                datasets: [
                { 
                    data: state.averageLineChartHappiness.map(val => Number(val)),
                    label: "Average happiness/sadness",
                    borderColor: "#3e95cd",
                    fill: false
                },

                { 
                    data: state.averageLineChartCalm.map(val=> Number(val)),
                    label: "average calm/anxiety",
                    borderColor: "#FF5733",
                    fill: false
                },
                { 
                    data: state.totalHappinessByDay.map(val=> Number(val)),
                    label: "total happiness/sadness",
                    borderColor: "#25BD65",
                    fill: false
                },
                { 
                    data: state.totalCalmByDay.map(val=> Number(val)),
                    label: "total calm/anxiety",
                    borderColor: "#904985",
                    fill: false
                },
            ]
            }
            return dataObj
        }
    },
    actions: {
        
        async communityClickData( { commit }){
            const dataToCommit = await PlotFunctions.get('plot/communityclickdata').then(response=>response.json())
            commit('createClickArray', dataToCommit)
        }
    },
    mutations:{
        createClickArray(state,arrayData) {
            Object.keys(arrayData).forEach(key =>{
                state[key]=arrayData[key]
            })
        },
        
        addNewClick(state,clickData){
            state.lineChartArrays.happinessVals.push(clickData.lineChart.happinessVal)
            state.lineChartArrays.calmVals.push(clickData.lineChart.calmVal)
            state.clickMapArray.push(clickData.clickMap)    
       },
        
        wipeDataState(state){
            Object.keys(initialState).forEach(key => {
                state[key]=initialState[key]
            })
        }

    }
}