const API_URL = 'http://localhost:8000/api/auth/';

class AuthService {
    genericFetch(payload,route){
        return fetch(API_URL + route, {
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
        return this.genericFetch({'username':user.username,'email':user.email,'password':user.password},'register')
        }
    activate(token){
        console.log("User activation in progress")
        return this.genericFetch({'token':token},'activate')      
        }
    forgot(emailAddr){
        console.log("Sending reset email")
        return this.genericFetch({'email':emailAddr},'forgot')
    }
    reset(newPasswordAndToken){
        console.log("Resetting password")
        return this.genericFetch(newPasswordAndToken,'reset')
    }
    refresh(){
        const tokenToRefresh=localStorage.getItem('token')
        this.genericFetch(tokenToRefresh,'refresh')
        .then(response=>response.json())
        .then(data=>{
                return data.access_token
            }) 
    }
}

export default new AuthService();
