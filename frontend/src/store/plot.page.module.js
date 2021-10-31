import ColorFunctions from '@/services/color.functions.js'

const initialState = {
    colorProfile: {
        happiness: "#FBF6D9",
        calm: "#CFECEC",
        anxiety: "#C35817",
        sadness: "#2B1B17"
    },
    variableSelectedForColorChange:"",
    showPanelSubset:false,
    showDataCollectionBox:false,
    showTextVariableQuadrant:{quadrant:"",move:false},
    animateTextInQuadrant:"",
    oldColorToChange:"",
    newColorOfChange :"",
    activeQuadrant : "",
}

export const plotPage = {
    namespaced:true,
    state: initialState,
    getters: {
        organizeColorsByQuadrant(state){
            const quadrantsByVariable = {
                one:['sadness','calm'],
                two:['happiness','calm'],
                three:['sadness','anxiety'],
                four:['happiness','anxiety']
            }
            const quadrantState = {};
            for (let [number,variables] of Object.entries(quadrantsByVariable) ) {
                quadrantState[number]={
                        x:{
                        variable:variables[0],
                        color:state.colorProfile[variables[0]]
                    },
                        y:{
                        variable:variables[1],
                        color:state.colorProfile[variables[1]],
                    },
                    number:number
                }
            }
            return quadrantState
        }
    },
    actions: {
        retrieveUserColorChoices( {commit} ) {
            return ColorFunctions.post({},'plot/usercolorchoice')
                .then(res=>res.json())
                .then(data => {
                    commit('loadUserColorChoices',data)
            })
        }
    },
    mutations: {
        activateQuadrant(state, quadrantToActivate){
            state.activeQuadrant = quadrantToActivate
        },
        animateText(state,quadrantToAnimate){
            state.animateTextInQuadrant = quadrantToAnimate
        },
        loadUserColorChoices(state,colorChoices) {
            state.colorProfile.happiness = colorChoices.happiness.hex;
            state.colorProfile.sadness = colorChoices.sadness.hex;
            state.colorProfile.calm = colorChoices.calm.hex;
            state.colorProfile.anxiety = colorChoices.anxiety.hex;            
        },
    }
}

