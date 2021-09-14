import { createStore } from "vuex";
import { auth } from "./auth.module";
import { wheelLock  } from "./visualization.module";
import { currentMoodColors } from "./plot.color.module";
import { moodClassification } from "./classification.module";
import { userData } from './user.data.module'
import { communityData } from "./community.data.module";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules: {
    auth,
    currentMoodColors,
    wheelLock,
    moodClassification,
    userData,
    communityData
  },
  plugins: [createPersistedState({
    paths:['auth','currentMoodColors','userData','communityData']
  })],

});

export default store;
