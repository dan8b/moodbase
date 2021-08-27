const API_URL = 'http://localhost:8000/api/auth/';

class AuthService {
    login(loginForm) {
        var formData= new FormData();
        for (var key in loginForm){
            formData.append(key,loginForm[key])
        }
        console.log(loginForm)
        return fetch(API_URL + 'login',{
                method: 'POST',
                mode: 'cors',
                // credentials: 'include',
                accept: 'application/json',
                // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: formData
            })
            }
    
    logout(user) {
                fetch(API_URL + 'logout', {
                method: 'POST',
                mode: 'cors',
                credentials:'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'user':user.id})
            })         
        
        localStorage.removeItem('user');
        }
    
    register(user) {
        return fetch(API_URL + 'register', {
            method: 'POST',
            mode: 'cors',
            credentials:'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username': user.username,'email':user.email,'password':user.password})
        })         
        }
    
}

export default new AuthService();
