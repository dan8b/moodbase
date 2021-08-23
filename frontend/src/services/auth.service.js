const API_URL = 'http://localhost:8000/api/user/';

class AuthService {
    login(user) {
        return fetch(API_URL + 'loginUser',{
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({'username': user.username,'password': user.password})
            })
            .then(res => { 
                if (res.ok===true){
                    console.log(res)

                    res.json()
                }
                else {
                    var error = new Error(res.statusText || res.status)
                    return Promise.reject(error)
                }
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
        return fetch(API_URL + 'registeruser', {
            method: 'POST',
            mode: 'cors',
            credentials:'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({'username': user.username,'email':user.email,'password':user.password})
        })         
        .then(res => res.json())
        .catch(error =>{
                var showError = new Error(error.statusText || error.status)
                return Promise.reject(showError)
                }   
                )
        }
    }
}

export default new AuthService();
