import WeightFunctions from '@/services/weight.functions.js'

const initialState = {
  todaysButts: {},
  buttConfig: {},
  interval: null,
  start: 0
}

export const butts = {
  namespaced: true,
  state: initialState,
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
    deleteButt (state, toDelete) {
      delete state.todaysButts[toDelete]
      delete state.buttConfig[toDelete]
    },
    brandNewButt (state, newButt) {
      state.myButts[newButt] = 0
    },
    loadInitialButts (state, buttsToLoad) {
      state.buttConfig = buttsToLoad.config
      if (!buttsToLoad.todaysData) {
        Object.keys(buttsToLoad.config).forEach(k => { state.todaysButts[k] = 0 })
      } else {
        Object.keys(buttsToLoad.config).forEach(k => {
          if (k in buttsToLoad.todaysData) {
            if (WeightFunctions.determineTimeRange() in buttsToLoad.todaysData[k]) {
              state.todaysButts[k] = buttsToLoad.todaysData[k][WeightFunctions.determineTimeRange()]
            }
          }
        })
      }
      state.numButts = Object.keys(buttsToLoad.config).length
    },
    incrementButt (state, buttclick) {
      state.start = buttclick.initialValue
      if (buttclick.type === 0) {
        state.interval = window.setInterval(function () { state.todaysButts[buttclick.name]++ }, 300)
      } else {
        state.interval = window.setInterval(function () { state.todaysButts[buttclick.name]-- }, 300)
      }
    },
    updateButt (state) {
      window.clearInterval(state.interval)
      state.interval = null
    },
    wipeButts (state) {
      state.interval = null
      state.start = null
      state.delta = null
      Object.keys(state.myButts).forEach(key => delete state.myButts[key])
    }
  }
}
