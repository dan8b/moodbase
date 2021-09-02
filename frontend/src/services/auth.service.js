// const API_URL = 'http://localhost:8000/api/auth/';
import store from '@/store/index.js'
import FetchFunctions from './fetch.service.js'

class AuthService extends FetchFunctions{

    login(loginForm) {
        console.log("Login in progress")
        return this.post({'username':loginForm.username,'password':loginForm.password},'auth/login')
            }    
    register(user) {
        console.log("User registration in progress")
        return this.post({'username':user.username,'email':user.email,'password':user.password},'auth/register')
        }
    activate(token){
        console.log("User activation in progress")
        return this.post({'token':token},'auth/activate')      
        }
    forgot(emailObj){
        console.log("Sending reset email")
        return this.post(emailObj,'auth/forgot')
    }
    reset(newPasswordAndToken){
        console.log("Resetting password")
        return this.genericFetch(newPasswordAndToken,'auth/reset')
    }
    refresh(token){
        console.log("Checking refresh token")
        return this.genericFetch(token,'auth/refresh')
        .then(
            response =>{
            if (Object.keys(response)[0]==="access_token"){
                store.dispatch('refresh',{refreshToken:response.access_token})
            }
            else {
              alert(new Error(response.detail))
            }
            
        })
    }

}

export default new AuthService();
