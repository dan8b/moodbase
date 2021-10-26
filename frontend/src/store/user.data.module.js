import PlotFunctions from '@/services/plot.functions.js'
// import { timeParse, extent} from 'd3'

const initialState = {
    happiness:[],
    calm:[],
    mapX:[],
    mapY:[],
    timestamp:[]
}

export const userData = {
    namespaced:true,
    state:initialState,
    getters: {
        // refactoring possible here
        returnMostRecent(state){
            const i = state.happiness-1
            const toBucket = {
                x:{
                    magnitude:Math.round(Math.abs(state.happiness[i])),
                    sign:Math.sign(state.happiness[i])
                },
                y:{
                    magnitude:Math.round(Math.abs(state.happiness[i])),
                    sign:Math.sign(state.happiness[i])
                }
            }
            return PlotFunctions.bucketMood(toBucket)
        },
        packageChartData(state){
            // const vals=state.timestamps.map(date => Date.parse(date))
            // const parseDate = timeParse("%Y-%m-%d")
            // const dates=extent(vals, val => parseDate(val))
            return state.happiness
            // return {
            //     happiness:state.lineChartArrays.happinessVals,
            //     calm: state.lineChartArrays.calmVals
            //     }
        },
        returnChartData(state){
            const dataObj=
            {
                labels: state.timestamp.map(date => Date.parse(date)),
                datasets: [
                { 
                    data: state.happiness.map(val => Number(val)),
                    label: "Happiness",
                    borderColor: "#3e95cd",
                    backgroundColor: '#2554FF',

                },

                 { 
                    data: state.calm.map(val=> Number(val)),
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
            state.happiness=arrayData.happiness;
            state.calm=arrayData.calm;
            state.mapX=arrayData.mapX
            state.mapY=arrayData.mapY
            state.timestamp=arrayData.timestamp
        },
        
        addNewClick(state,clickData){
            state.happiness.push(clickData.happiness)
            state.calm.push(clickData.calm)
            // state.mapX.push(clickData.mapX)    
       },
        
        wipeDataState(state){
            Object.keys(initialState).forEach(key => { state[key]=initialState[key]})

        }

    }
}
