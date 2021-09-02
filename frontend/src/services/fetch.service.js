const API_URL = 'http://localhost:8000/api/';

export default class FetchFunctions {
    chooseHeader(route){
        if (route==='auth/refresh') { return localStorage.getItem('refreshToken')}
        else { return localStorage.getItem('accessToken')}
    }
    post(payload, route){
        return fetch(API_URL + route, {
            method: 'POST',
            mode: 'cors',
            credentials:'include',
            headers: {
                'Authorization':'Bearer '+ localStorage.getItem('accessToken'),
                'Refresh':"Bearer " + localStorage.getItem("refreshToken"),
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
              'Authorization':'Bearer '+ this.chooseHeader(route),
              'Content-Type': 'application/json', 
            },
        })       
      }
}

