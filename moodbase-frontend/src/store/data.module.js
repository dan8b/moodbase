import VisualizationService from "@/services/visualization.service"

const initialState = {
    newPoint:{}
}

export const plotData = {
    namespaced:true,
    state:initialState,
    actions: {
        convertPointData( { commit },pointData){
            const dataToCommit=VisualizationService.classifyMoodValues(pointData,false)
            commit('addNewPoint',dataToCommit)
        }
    },
    mutations:{
        addNewPoint(state,newPointData){
            state.newPoint=newPointData
            // console.log(state)
        }
    }
}
