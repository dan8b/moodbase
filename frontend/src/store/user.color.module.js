import ColorFunctions from '@/services/color.functions.js'

const initialState={
    colorProfile: {
        happy:"",
        calm:"",
        anxious:"",
        sad:"",
        },
    panelVisibility:false,
    readyForCommit:false,
    colorSelection:"",
    variableSelection:"",
    showDemoColor:false,
    demoColor:"",
    previousColor:"",
    listOfColors:{},
    listLayer:0,
    currentSubset:"",
    popularityPanel:false
}

export const currentMoodColors = {
    namespaced: true,
    state: initialState,
    getters: {
        packageChangeData(state){
            return {
                variable:state.variableSelection,
                colorChange:{family:state.currentSubset,hex:state.colorProfile[state.variableSelection]}
           }
        },
        initialColorData(state,variable){
            return state.colorProfile[variable]
        },
    },
    actions: {
        async createInitialState( {commit} ) {
            await ColorFunctions.post({},'plot/usercolorchoice')
            .then(res=>res.json())
            .then(data => {
                commit('createState',data)
            })
        },
        async getListOfChoices( {commit} ){
            await ColorFunctions.get('plot/listofcolors').then(res=>res.json()).then(data=>commit('setColorList',data))
            }
    },
    mutations: {
        toggleDetailPanel(state,variable){
            if (variable!=null && (state.popularityPanel === false || state.variableSelection!=variable)){
                    state.variableSelection=variable
                    state.popularityPanel=true
                }
            else{
                state.variableSelection=null,
                state.popularityPanel=false
            }
        },
        setSubset(state,subsetChoice){
            state.currentSubset=subsetChoice
        },
        changeLayer(state){
            state.listLayer = (state.listLayer+1)%2
        },
        togglePanel(state,variable){
            if (variable!=null && (state.panelVisibility === false || state.variableSelection!=variable)){
                state.variableSelection=variable;
                state.previousColor=state.colorProfile[variable]
                state.panelVisibility=true;
                state.currentColorFamily=null
            }
            else{
                state.panelVisibility=false;
                state.previousColor="";
                state.demoColor=null;
                state.currentColorFamily=null;
                state.variableSelection="";
                state.readyForCommit=false;
            }
        },
        setColorList(state,listData){
            state.listOfColors=listData
        },
        showColorDemonstration(state, demonstrationData){
            state.demoColor=demonstrationData
            state.showDemoColor=true;
        },
        setVariableToChange(state,variableName){
            state.variableSelection=variableName;
        },
        createState(state,stateData) {
            state.colorProfile.happy=stateData.happy.hex;
            state.colorProfile.calm=stateData.calm.hex;
            state.colorProfile.anxious=stateData.anxious.hex;
            state.colorProfile.sad=stateData.sad.hex;
            },
        changeColor(state,colorChoice) {
            state.previousColor=state.colorProfile[colorChoice.variableName]
            state.colorProfile[colorChoice.variableName]=colorChoice.selectedColor;
            if(state.readyForCommit === false) {state.readyForCommit=true;}
        },
        wipeColorState(state){
            localStorage.removeItem('listOfColors')
            Object.keys(initialState).forEach(key => { state[key]=initialState[key]})
        }
    },


}