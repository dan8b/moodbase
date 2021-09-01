// const API_URL = 'http://localhost:8000/api/auth/';

import FetchFunctions from './fetch.service.js'

class AuthService extends FetchFunctions{

    login(loginForm) {
        var formData= new FormData();
        for (var key in loginForm){
            formData.append(key,loginForm[key])
        }
        // not generic fetch because the request is finicky, will have to do more investigation
        return fetch('http://localhost:8000/api/auth/login',{
                method: 'POST',
                mode: 'cors',
                // credentials: 'include',
                accept: 'application/json',
                // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: formData
            })
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
    refresh(){
        const tokenToRefresh=localStorage.getItem('token')
        this.post(tokenToRefresh,'auth/refresh')
        .then(response=>response.json())
        .then(data=>{
                return data.access_token
            }) 
    }
    checkAuth(){
        return this.post({"turd":"butt"},'testcred')

    }
}

export default new AuthService();
