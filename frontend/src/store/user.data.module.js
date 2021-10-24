import PlotFunctions from '@/services/plot.functions.js'
// import { timeParse, extent} from 'd3'

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
        // refactoring possible here
        returnMostRecent(state){
            const i = state.lineChartArrays.happinessVals.length-1
            const toBucket = {
                x:{
                    magnitude:Math.round(Math.abs(state.lineChartArrays.happinessVals[i])),
                    sign:Math.sign(state.lineChartArrays.happinessVals[i])
                },
                y:{
                    magnitude:Math.round(Math.abs(state.lineChartArrays.calmVals[i])),
                    sign:Math.sign(state.lineChartArrays.calmVals[i])
                }
            }
            return PlotFunctions.bucketMood(toBucket)
        },
        packageChartData(state){
            // const vals=state.timestamps.map(date => Date.parse(date))
            // const parseDate = timeParse("%Y-%m-%d")
            // const dates=extent(vals, val => parseDate(val))
            return state.lineChartArrays.happinessVals
            // return {
            //     happiness:state.lineChartArrays.happinessVals,
            //     calm: state.lineChartArrays.calmVals
            //     }
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
                    backgroundColor: '#2554FF',

                },

                 { 
                    data: state.lineChartArrays.calmVals.map(val=> Number(val)),
                    label: "Calm/anxiety",
                    borderColor: "#FF5733",
                    backgroundColor:"#90ee90"
                }
            ]
            }
            return dataObj
        }
    },
    actions: {
        
        async retrieveClickData( { commit }){
            const dataToCommit = await PlotFunctions.get('plot/userclickdata').then(response=>response.json())
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
            state.lineChartArrays.happinessVals.push(clickData.lineChart.happinessVal)
            state.lineChartArrays.calmVals.push(clickData.lineChart.calmVal)
            state.clickMapArray.push(clickData.clickMap)    
       },
        
        wipeDataState(state){
            Object.keys(initialState).forEach(key => { state[key]=initialState[key]})

        }

    }
}
