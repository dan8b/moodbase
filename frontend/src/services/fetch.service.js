const API_URL = 'http://localhost:8000/api/';
const unprotectedRoutes = ['plot/listofcolors','auth/login','auth/register','auth/reset','auth/forgot','auth/activate']

export default class FetchFunctions {
    updateToken(){
        return fetch('http://localhost:8000/api/auth/refresh', 
        {
            headers:{
            'Refresh':localStorage.getItem("refreshToken"),
            'Check-Token':localStorage.getItem('accessToken'),
            }
        })
        .then(response2=>response2.json())
        .then((data)=>{
            window.localStorage.setItem('accessToken',data.access_token)
        })
    }
    async post(payload, route){
        if (unprotectedRoutes.includes(route)===false){
            await this.updateToken()
        }
        return fetch(API_URL + route, {
            method: 'POST',
            mode: 'cors',
            credentials:'include',
            headers: {
                'Authorization':'Bearer '+ localStorage.getItem('accessToken'),
                'Refresh':localStorage.getItem("refreshToken"),
                'Content-Type': 'application/json',
        },
            body: JSON.stringify(payload)
        })
        }
    
    get(route){
        return fetch(API_URL + route, {
          method: 'GET',
          mode: 'cors',
          credentials:'include',
          headers: {
              'Authorization':'Bearer '+ localStorage.getItem('accessToken'),
              'Content-Type': 'application/json', 
            },
        })       
      }
}

