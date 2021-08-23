import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
       return AuthService.login(user).then(
        response=>
          {
            if (response.ok===true) {
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
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
            if(response.ok===true){
              console.log(response)
              commit('registerSuccess');
             return response        
        }
        else{
          console.log(response)
          commit('registerFailure');
          return "Failure";
        }
        }
      )
    },
    },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  },

};
