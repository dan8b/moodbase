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
       return AuthService.login(user).then(
        response=>
          {
            if (response.ok) {
              commit('loginSuccess',response)
              return response
            }
          else{
          commit('loginFailure');
          return Error(response.statusText || response.status)
          }
        }
        
        )
      },
    logout({ commit }, user) {
      AuthService.logout(user);
      commit('logout');
    },
  
    },
  mutations: {
    loginSuccess(state, token) {
      state.loggedIn = true;
      state.accessToken = token;
    },
    loginFailure(state) {
      state.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
 
  },

};
