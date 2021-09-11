import PlotFunctions from '@/services/plot.functions.js'

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
}
export const currentMoodColors = {
    namespaced: true,
    state: initialState,
    getters: {
        packageChangeData(state){
            return {
                newColor:state.colorProfile[state.variableSelection],
                variable:state.variableSelection
            }
        },
        initialColorData(state,variable){
            return state.colorProfile[variable]
        },
    },
    actions: {
        async createInitialState( {commit} ) {
            await PlotFunctions.post({},'plot/usercolorchoice')
            .then(res=>res.json())
            .then(data => {
                commit('createState',data)
            })
        },
        async getListOfChoices( {commit} ){
            await PlotFunctions.get('plot/listofcolors').then(res=>res.json()).then(data=>commit('setColorList',data))
            }
    },
    mutations: {
        setSubset(state,subsetChoice){
            state.currentSubset=subsetChoice
        },
        changeLayer(state){
            state.listLayer = (state.listLayer+1)%2
        },
        togglePanel(state,variable){
            if (state.panelVisibility === false){
                state.variableSelection=variable;
                state.previousColor=state.colorProfile[variable]
                state.panelVisibility=true;
            }
            else{
                state.panelVisibility=false;
                state.previousColor="";
                state.demoColor=null;
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
            state.colorProfile.happy=stateData.happy;
            state.colorProfile.calm=stateData.calm;
            state.colorProfile.anxious=stateData.anxious;
            state.colorProfile.sad=stateData.sad;
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