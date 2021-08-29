const API_URL = 'http://localhost:8000/api/auth/';

class AuthService {
    genericFetch(payload){
        return fetch(API_URL + 'register', {
            method: 'POST',
            mode: 'cors',
            credentials:'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })       
    }
    login(loginForm) {
        var formData= new FormData();
        for (var key in loginForm){
            formData.append(key,loginForm[key])
        }
        // not generic fetch because the request is finicky, will have to do more investigation
        return fetch(API_URL + 'login',{
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
        return this.genericFetch({'username':user.username,'email':user.email,'password':user.password})
        }
    activate(token){
        console.log("User activation in progress")
        return this.genericFetch({'token':token})      
        }
    forgot(emailAddr){
        console.log("Sending reset email")
        return this.genericFetch({'email':emailAddr})
    }
    reset(newPasswordAndToken){
        console.log("Resetting password")
        return this.genericFetch(newPasswordAndToken)
    }
    refresh(){
        const tokenToRefresh=localStorage.getItem('token')
        this.genericFetch(tokenToRefresh)
        .then(response=>response.json())
        .then(data=>{
                this.$state.dispatch('auth/loginSuccess',data.access_token)
            }) 
    }
}

export default new AuthService();
