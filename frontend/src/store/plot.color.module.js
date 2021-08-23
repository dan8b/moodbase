import ColorSelection from '@/services/color.selector.service.js'

const initialState={
    user:"",
    colorProfile: {
        happy:"",
        calm:"",
        anxious:"",
        sad:"",
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
                uid:state.user,
                toChange:state.colorSelection,
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
        createInitialState( {commit}, uid) {
            ColorSelection.getInitialChoices(uid)
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
            state.colorProfile.happy=stateData.happy;
            state.colorProfile.calm=stateData.calm;
            state.colorProfile.anxious=stateData.anxious;
            state.colorProfile.sad=stateData.sad;
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