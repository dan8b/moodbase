import WeightFunctions from '@/services/weight.functions.js'

const initialState = {
  weightsByRadius: {},
  interval: null,
  pathByVariable: {},
  wiggleRoom: 100,
  activeVariable: null
}

export const butts = {
  namespaced: true,
  state: initialState,
  getters: {
    dataForDotRendering (state) {
      return {
        numPoints: Object.keys(state.weightsByRadius).length,
        buttNames: Object.keys(state.weightsByRadius)
      }
    }
  },
  actions: {
    createButts ({ commit }) {
      WeightFunctions.get('allot/retrieveweightdata')
        .then(res => res.json())
        .then(data => {
          commit('loadInitialButts', data)
        })
    },
    newButt ({ commit }, butt) {
      WeightFunctions.post({}, 'allot/createnewbutton/' + butt)
      commit('brandNewButt', butt)
    },
    deleteButt ({ commit }, butt) {
      WeightFunctions.post({}, 'allot/deletebutt/' + butt)
      commit('deleteButt', butt)
    }
  },
  mutations: {
    // takes the data on weight config from the GET request in createButts
    // saves names and number of buttons to state variables
    loadInitialButts (state, buttConfigData) {
      state.weightsByRadius = buttConfigData
      var i = 0
      for (const cPair of Object.values(buttConfigData)) {
        state.pathByVariable[Object.keys(buttConfigData)[i]] = WeightFunctions.polarToCartesian({
          radius: cPair,
          iter: i,
          nGon: Object.keys(buttConfigData).length
        })
        i++
      }
    },
    drawPath (state, variable) {
      state.activeVariable = variable.vName
      var currentRadius = state.weightsByRadius[variable.vName]
      const incrementOrDecrement = WeightFunctions.wackyLogic(variable.coordinates)
      state.wiggleRoom = WeightFunctions.computeWiggleRoom(Object.values(state.weightsByRadius))
      state.interval = window.setInterval(() => {
        if ((state.wiggleRoom < 0 && variable.shrinkPath === 1) || (Math.abs(currentRadius) < 0.01 && variable.shrinkPath === -1)) {
          window.clearInterval(state.interval)
          state.interval = null
        } else {
          currentRadius += Math.sqrt(2) * variable.shrinkPath
          state.pathByVariable[variable.vName].x += incrementOrDecrement.x * variable.shrinkPath
          state.pathByVariable[variable.vName].y += incrementOrDecrement.y * variable.shrinkPath
          state.weightsByRadius[variable.vName] = currentRadius
          state.wiggleRoom = WeightFunctions.computeWiggleRoom(Object.values(state.weightsByRadius))
          console.log(state.wiggleRoom)
        }
      }, 1)
    },
    completePath (state) {
      window.clearInterval(state.interval)
      state.interval = null
    }
  }
}
