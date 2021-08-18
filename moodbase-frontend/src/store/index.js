import { createStore } from "vuex";
import { auth } from "./auth.module";
import { wheelLock  } from "./visualization.module";
import { currentMoodColors } from "./plot.color.module";
import { moodClassification } from "./classification.module";
import { plotData } from './data.module'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules: {
    auth,
    currentMoodColors,
    wheelLock,
    moodClassification,
    plotData,
  },
  plugins: [createPersistedState({
    paths:['auth','currentMoodColors']
  })],

});

export default store;
