const API_URL = 'http://localhost:8000/api/';

export default class FetchFunctions {
    post(payload, route){
        return fetch(API_URL + route, {
            method: 'POST',
            mode: 'cors',
            credentials:'include',
            headers: {
                'Authorization':'Bearer '+localStorage.getItem('token'),
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
              'Authorization':'Bearer '+localStorage.getItem('token'),
              'Content-Type': 'application/json', 
            },
        })       
      }
}

