import PlotFunctions from '@/services/plot.functions.js'
const initialState = {
    clickDataArray:[],
    newPoint:{}
}

export const userData = {
    namespaced:true,
    state:initialState,
    getters: {
        prepareDataForLineChart(){

        }
    },
    actions: {
        retrieveClickData( { commit }){
            const dataToCommit = PlotFunctions.getData()
            commit('createClickArray', dataToCommit)
        }
    },
    mutations:{
        createClickArray(state,arrayData) {
            state.clickDataArray=arrayData
        }

    }
}
