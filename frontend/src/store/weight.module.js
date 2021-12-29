import WeightFunctions from '@/services/weight.functions.js'

const initialState = {
  weightsByRadius: {},
  interval: null,
  moveOtherPoints: false,
  pathByVariable: {},
  wiggleRoom: 100,
  activeVariable: null,
  snapshotRadius: {}
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
        if (state.wiggleRoom < 0.001 && variable.shrinkPath === 1) {
          state.wiggleRoom = 0
          for (const [weight, radius] of Object.entries(state.weightsByRadius)) {
            if (weight !== variable.vName) {
              state.wiggleRoom += radius
              state.snapshotRadius[weight] = radius
            }
          }
          if (state.wiggleRoom > 0) {
            state.moveOtherPoints = true
          } else {
            state.moveOtherPoints = false
            window.clearInterval(state.interval)
            state.interval = null
          }
        } else if (Math.abs(currentRadius) < 0.01 && variable.shrinkPath === -1) {
          state.moveOtherPoints = false
          window.clearInterval(state.interval)
          state.interval = null
        } else {
          if (state.moveOtherPoints) {
            const weightNames = Object.keys(state.weightsByRadius)
            var adjustmentDirection = null
            for (const name of weightNames) {
              if (state.weightsByRadius[name] > 0 && name !== variable.vName && (Math.abs(state.pathByVariable[name].x) + Math.abs(state.pathByVariable[name].y) > 0)) {
                adjustmentDirection = WeightFunctions.wackyLogic(state.pathByVariable[name])
                state.pathByVariable[name].x += (adjustmentDirection.x * -1 * variable.shrinkPath)
                state.pathByVariable[name].y += (adjustmentDirection.y * -1 * variable.shrinkPath)
                state.weightsByRadius[name] -= Math.sqrt(2)
                console.log(name)
              }
            }
          }
          currentRadius += Math.sqrt(2) * variable.shrinkPath
          state.pathByVariable[variable.vName].x += incrementOrDecrement.x * variable.shrinkPath
          state.pathByVariable[variable.vName].y += incrementOrDecrement.y * variable.shrinkPath
          state.weightsByRadius[variable.vName] = currentRadius
          state.wiggleRoom--
        }
      }, 1)
    },
    completePath (state) {
      window.clearInterval(state.interval)
      state.interval = null
    }
  }
}
