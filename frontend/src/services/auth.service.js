const API_URL = 'http://localhost:8000/api/auth/';

class AuthService {
    login(formData) {
        return fetch(API_URL + 'login',{
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {'Content-Type': 'x-www-form-urlencoded'},
                body: JSON.stringify(formData)
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
