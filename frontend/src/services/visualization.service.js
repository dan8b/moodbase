const API_URL = 'http://localhost:5000/api/';

class VisualizationService {
    getLineChart(uid,variableOfInterest) {
      return fetch(API_URL+'retrieveLineChart', {
                method: 'POST',
                mode: 'cors',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({'uid':uid, 'returnVariable':variableOfInterest}) 
                })
    }

  getClickMap(uid)
  {
    return fetch(API_URL+'retrieveClickMap', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'uid':uid}) 
      })


  } 
  async getAndClassifyClickHistory(uid){
    const classified=[];
    const preClassified=await fetch(API_URL+'getMostRecentClicks', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'uid':uid}) 
      }).then(res=>res.json())
      for (let index in preClassified){
        const valAtIndex=preClassified[index]
        classified.push(this.classifyMoodValues(valAtIndex,true))
      }
      return classified
  }

  classifyMoodValues(moodValuePair,prepared){
    var timeStamp=0
    if ('day' in moodValuePair)
     { 
      timeStamp=moodValuePair.day.slice(0, 19).replace(/-/g, "/").replace("T", " ")
     }
    else
    {
      timeStamp=(new Date()).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")
    }
    var magnitudeX; var magnitudeY;
    const coordinatePair=
    {
      x:{magnitude:0,sign:0},
      y:{magnitude:0,sign:0}
    }
    if (prepared===true){
      magnitudeX=moodValuePair.happy;
      magnitudeY=moodValuePair.calm;
    }
    else
      {
      if ((moodValuePair.x)<10){
        magnitudeX=0
      }
      else {
        magnitudeX=(moodValuePair.x-300)*(7/300) 
      }
      if (moodValuePair.y<10){
        magnitudeY=0

      }
      else {
        magnitudeY=(moodValuePair.y-300)*(-7/300) 
      }
    }
    const signX=Math.sign(magnitudeX)

    const signY=Math.sign(magnitudeY)
    
    coordinatePair.x={magnitude:Math.round(Math.abs(magnitudeX)),sign:signX}
    coordinatePair.y={magnitude:Math.round(Math.abs(magnitudeY)),sign:signY}

    const bucketMagnitude={
      0:"barely",
      1:"slightly",
      2:"somewhat",
      3:"noticeably",
      4:"quite",
      5:"very",
      6:"extremely",
      7:"incredibly"
    }
    const bucketHappiness={
      "-1":"sad",
      1:"happy",
      0:"any happiness or sadness"
    }
    const bucketCalm={
      "-1":"anxious",
      1:"calm",
      0:"any calm or anxiety"
    }
    const classificationInformation={
      happiness: {
        severity:bucketMagnitude[coordinatePair.x.magnitude],
        mood:bucketHappiness[coordinatePair.x.sign],
      },
      calm:{
        severity:bucketMagnitude[coordinatePair.y.magnitude],
        mood:bucketCalm[coordinatePair.y.sign]
      },
      timeStamp:timeStamp
    }

    return classificationInformation
  }





}

export default new VisualizationService();
