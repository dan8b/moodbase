import { createStore } from "vuex";
import { auth } from "./auth.module";
import { wheelLock  } from "./visualization.module";
import { currentMoodColors } from "./user.color.module";
import { moodClassification } from "./classification.module";
import { userData } from './user.data.module'
import { butts } from './weight.module'
import { communityData } from "./community.data.module";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  modules: {
    auth,
    currentMoodColors,
    wheelLock,
    moodClassification,
    userData,
    communityData,
    butts,
    },
  plugins: [createPersistedState({
    paths:['auth','currentMoodColors','userData','communityData','butts']
  })],

});

export default store;
