import { createStore } from "vuex";
import { auth } from "./auth.module";
import { wheelLock  } from "./visualization.module";
import { currentMoodColors } from "./plot.color.module";
import { moodClassification } from "./classification.module";
import { userData } from './data.module'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules: {
    auth,
    currentMoodColors,
    wheelLock,
    moodClassification,
    userData,
  },
  plugins: [createPersistedState({
    paths:['auth','currentMoodColors']
  })],

});

export default store;
