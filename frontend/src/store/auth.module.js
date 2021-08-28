import AuthService from '../services/auth.service';

const initialState = {
  loggedIn:false,
  accessToken:"",
  wantsRefresh:false
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

    }
  },
  mutations: {
    loginSuccess(state, token) {
      state.loggedIn = true;
      state.accessToken = token.access_token;
      window.localStorage.setItem('token', state.accessToken);
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
 
  },

};
