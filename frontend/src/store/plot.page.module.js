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
    activeQuadrant : "none",
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

            if (state.activeQuadrant != "none") {
                const vars = quadrantsByVariable[state.activeQuadrant]
                return {
                    x:{
                        variable:vars[0],
                        color:state.colorProfile[vars[0]]
                    },
                        y:{
                        variable:vars[1],
                        color:state.colorProfile[vars[1]],
                    },
                    number:state.activeQuadrant
                }
            }
            else{
                const allQuadrantState = {};    
                for (let [number,variables] of Object.entries(quadrantsByVariable) ) {
                    allQuadrantState[number]={
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
                return allQuadrantState
            }
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

