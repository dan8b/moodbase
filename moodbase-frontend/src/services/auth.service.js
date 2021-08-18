const API_URL = 'http://localhost:5000/api/';

class AuthService {
    login(user) {
        return fetch(API_URL + 'login',{
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'username': user.username,'password': user.password})
            })
            .then(res => 
                res.json())
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
