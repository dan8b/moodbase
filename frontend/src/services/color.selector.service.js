const API_URL = 'http://localhost:5000/api/';

class ColorSelection {
  getInitialChoices(uid){
    return fetch(API_URL+'getplotcolors', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'uid':uid}) 
      })
  }
  getAvailableChoices(){
    return fetch(API_URL+'colorPanelData')
  }
  commitColorChange(changeInfo){
    return fetch(API_URL+'setPlotColors', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(changeInfo) 
      })
  }
}
export default new ColorSelection();