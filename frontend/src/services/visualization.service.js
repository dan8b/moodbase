import FetchFunctions from "./fetch.service"

class VisualizationFunctions extends FetchFunctions {
  getLineChart(){

  }
  // async getAndClassifyClickHistory(uid){
  //   const classified=[];
  //   const preClassified=await fetch(API_URL+'getMostRecentClicks', {
  //     method: 'POST',
  //     mode: 'cors',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({'uid':uid}) 
  //     }).then(res=>res.json())
  //     for (let index in preClassified){
  //       const valAtIndex=preClassified[index]
  //       classified.push(this.classifyMoodValues(valAtIndex,true))
  //     }
  //     return classified
  // }

}

export default new VisualizationFunctions();
