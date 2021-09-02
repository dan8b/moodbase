import AuthService from '../services/auth.service';

const initialState = {
  loggedIn:false,
  accessToken:"",
  refreshToken:"",
}

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user)
      .then(
        response=>response.json())
      .then(
        data => {
          commit('loginSuccess',data)
          return data
        }
      )
      .catch(
        (error) => {
          commit('loginFailure');
          return error
      }
        )
    },
    logout({ commit }) {
      localStorage.removeItem('token')
      commit('logoutSuccess');

    },
    activate({commit},tokenDict){
      commit('loginSuccess',tokenDict)
    },
    refresh({commit},refreshToken){
      commit('loginSuccess',refreshToken)
    }
  },
  mutations: {
    loginSuccess(state, token) {
      state.loggedIn = true;
      state.accessToken = token.access_token;
      state.refreshToken=token.refresh_token
      window.localStorage.setItem('accessToken', state.accessToken);
      window.localStorage.setItem('refreshToken', state.refreshToken);
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.user = null;
    },
    logoutSuccess(state) {
      state.loggedIn = false;
      state.accessToken = "";
      state.wantsRefresh=false;
    },
    refreshToken(state,newToken){
      state.accessToken=newToken.access_token
      window.localStorage.setItem('accessToken',state.accessToken)
    }
  },

};
