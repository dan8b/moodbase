import PlotFunctions from '@/services/plot.functions.js'

const initialState={
    colorProfile: {
        happyColor:"",
        calmColor:"",
        anxiousColor:"",
        sadColor:"",
        },
    panelVisibility:false,
    colorSelection:"",
    variableSelection:"",
    showDemoColor:false,
    demoColor:"",
}
export const currentMoodColors = {
    namespaced: true,
    state: initialState,
    getters: {
        packageChangeData(state){
            return {
                newColor:state.colorSelection,
                variable:state.variableSelection
            }
        },
        changePendingCommit(state){
            if(state.colorSelection!=""){
                return true
            }
        },
        initialColorData(state,variable){
            return state.colorProfile[variable]
        }
    },
    actions: {
        async createInitialState( {commit} ) {
            await PlotFunctions.post({},'plot/usercolorchoice')
            .then(res=>res.json())
            .then(data => {
                commit('createState',data)
            })
        },
    },
    mutations: {
        showColorDemonstration(state, demonstrationData){
            state.demoColor=demonstrationData
            state.showDemoColor=true;
        },
        clearSelection(state){
            state.colorSelection="";
            state.panelVisibility=false;
            state.variableSelection="";
        },
        showPanel(state,showOrHide){
            state.panelVisiblity=showOrHide;
        },
        setColorToChange(state,chosenColor){
            state.colorSelection=chosenColor;
        },
        setVariableToChange(state,variableName){
            state.variableSelection=variableName;
        },
        createState(state,stateData) {
            state.user=stateData.uid;
            state.colorProfile.happyColor=stateData.happyColor;
            state.colorProfile.calmColor=stateData.calmColor;
            state.colorProfile.anxiousColor=stateData.anxiousColor;
            state.colorProfile.sadColor=stateData.sadColor;
            },
        changeColor(state,colorChoice) {
            state.colorProfile[colorChoice.variableName]=colorChoice.selectedColor;
        },
        wipeColorState(state){
            console.log(state)
            Object.keys(initialState).forEach(key => { state[key]=initialState[key]})
            console.log(state)
        }
    },


}