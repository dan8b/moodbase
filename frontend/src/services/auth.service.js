const API_URL = 'http://localhost:8000/api/auth/';

class AuthService {
    login(loginForm) {
        var formData= new FormData();
        for (var key in loginForm){
            formData.append(key,loginForm[key])
        }
        return fetch(API_URL + 'login',{
                method: 'POST',
                mode: 'cors',
                // credentials: 'include',
                accept: 'application/json',
                // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: formData
            })
            }
    
    // logout(user) {
    //             fetch(API_URL + 'logout', {
    //             method: 'POST',
    //             mode: 'cors',
    //             credentials:'include',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify({'user':user.id})
    //         })         
        
    //     localStorage.removeItem('user');
    //     }
    
    register(user) {
        console.log("User registration in progress")
        return fetch(API_URL + 'register', {
            method: 'POST',
            mode: 'cors',
            credentials:'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username': user.username,'email':user.email,'password':user.password})
        })         
        }
    activate(token){
        console.log("User activation in progress")
        return fetch(API_URL + 'activate', {
            method: 'POST',
            mode: 'cors',
            credentials:'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'token':token})
        })         
        }
    forgot(emailAddr){
        console.log("Sending reset email")
        return fetch(API_URL + 'forgot', {
            method: 'POST',
            mode: 'cors',
            credentials:'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'email':emailAddr})
        })       
    }
    reset(newPasswordAndToken){
        console.log("Resetting password")
        console.log(newPasswordAndToken)
        return fetch(API_URL + 'reset', {
            method: 'POST',
            mode: 'cors',
            credentials:'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newPasswordAndToken)
        }) 
    }
    
    
}

export default new AuthService();
