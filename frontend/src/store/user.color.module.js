import ColorFunctions from '@/services/color.functions.js'
import PlotFunctions from '@/services/plot.functions.js'

const initialState={
    colorProfile: {
        happiness:"",
        calm:"",
        anxiety:"",
        sadness:"",
        },
    originalColor:"",
    colorSelection:"",
    variableSelection:"",
    showDemoColor:false,
    demoColor:"",
    listOfColors:{},
    listLayer:0,
    currentSubset:"",
    popularityPanel:false,
    popularityData:[],
    quadrants:{},
    activeQuadrant:"none",
}

export const currentMoodColors = {
    namespaced: true,
    state: initialState,
    getters: {
        sendColorChange( state){
            console.log("beginning of module")
            const colorChangeData={
                variable:state.variableSelection,
                colorChange:{family:state.currentSubset,hex:state.colorProfile[state.variableSelection]}
            }
            return ColorFunctions.post(colorChangeData,'plot/changecolors')
            .then(res => res.json())
            .then( data => {{
                    console.log(data);
                    return data;
            }
            })
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
            await ColorFunctions.get('plot/listofcolors').then(res=>res.json()).then(data=>commit('setColorList', data))
        },
        getPopularityData( {commit }, newVariable){
            ColorFunctions.get('plot/communitycolors/'+newVariable).then(r=>r.json()).then(data => commit('setPopularityData', data))
        },
    },
    mutations: {
        afterSendingChange(state){
            state.originalColor="";
            state.variableSelection="";
        },
        holdOriginalColor(state){
            state.originalColor = state.colorProfile[state.variableSelection];
        },
        returnOriginalColor(state){
            state.colorProfile[state.variableSelection] = state.originalColor;
            state.originalColor="";
        },
        changeColor(state,color) {
            state.colorProfile[state.variableSelection]=color;
        },
        animateText(state,qId){
            state.quadrants[qId].moveText=!state.quadrants[qId].moveText;
        },
        hideQuadrants(state,qId){
            for (let quadrant of Object.keys(state.quadrants)){
                if (quadrant != qId) {
                    state.quadrants[quadrant].visibility.showBox=false;
                    state.quadrants[quadrant].visibility.showText=false;
                }
                else {
                    setTimeout( () => {
                        state.quadrants[quadrant].moveText=true;
                        state.quadrants[quadrant].visibility.showBox=false;
                        state.quadrants[quadrant].moveText=true;
                        }
                    ,500)
                }
            }
            state.activeQuadrant=qId
        },
        unselectQuadrant(state){
            state.quadrants[state.activeQuadrant].moveText=false;
            state.activeQuadrant="none";
            state.variableSelection="";
        },
        showQuadrants(state){
            for (let quadrant of Object.keys(state.quadrants)){
                state.quadrants[quadrant].visibility.showBox=true;
                state.quadrants[quadrant].visibility.showText=true;
            }
        },
        initializeGridState(state){
            state.quadrants = PlotFunctions.prepareQuadrants(state.colorProfile);
        },
        setPopularityData(state, data){
            state.popularityData=data
        },
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
            state.currentSubset=subsetChoice;
        },
        changeLayer(state){
            state.listLayer = (state.listLayer+1)%2;
        },
        setColorList(state,listData){
            state.listOfColors=listData;
        },
        showColorDemonstration(state, demonstrationData){
            state.demoColor=demonstrationData;
            state.showDemoColor=true;
        },
        setVariableToChange(state,variableName){
            state.variableSelection=variableName;
        },
        createState(state,stateData) {
            state.colorProfile.happiness=stateData.happiness.hex;
            state.colorProfile.calm=stateData.calm.hex;
            state.colorProfile.anxiety=stateData.anxiety.hex;
            state.colorProfile.sadness=stateData.sadness.hex;
            },

        wipeColorState(state){
            localStorage.removeItem('listOfColors')
            Object.keys(initialState).forEach(key => { state[key]=initialState[key]})
        }
    },
   }
