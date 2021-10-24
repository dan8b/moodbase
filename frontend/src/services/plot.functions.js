import FetchFunctions from "./fetch.service"

class PlotFunctions extends FetchFunctions{
    
    classifyMoodValues(coordinates){
      return this.bucketMood({
        x: {magnitude:Math.round(Math.abs(coordinates.happinessVal)),sign:Math.sign(coordinates.happinessVal)},
        y: {magnitude:Math.round(Math.abs(coordinates.calmVal)),sign:Math.sign(coordinates.happinessVal)}
      })
    }

    bucketMood(coordinatePair){
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
        }
        return classificationInformation
      }
//maybe redo below with a constructor
      prepareQuadrants(colorDataObject){

        const variablePairs={
            one:{xVar:'sad',yVar:'calm',translateX:0,translateY:0},
            two:{xVar:'happy',yVar:'calm', translateX:1,translateY:0},
            three:{xVar:'sad',yVar:'anxious', translateX:0, translateY:1},
            four:{xVar:'happy',yVar:'anxious', translateX:1, translateY:1},
          }

        const quadrantObject = {}

        for (let num of Object.keys(variablePairs)){
          quadrantObject[num] = 
            {
              data:{
                xVar: variablePairs[num].xVar,
                yVar: variablePairs[num].yVar,
                xColor: colorDataObject[variablePairs[num].xVar],
                yColor: colorDataObject[variablePairs[num].yVar]
              },
              visibility: {
                showBox:true,
                showText:true,
                showClassifier:false,
              },
              moveText:false
            }
        }
        return quadrantObject
      }   
    returnGradient(request){
      if (request.axis==="h"){
          return {x1:1,x2:0,y1:0.5,y2:0.5}
        }
      else if (request.axis==="v"){
          return {x1:0.5,x2:0.5,y1:0,y2:1}
        }
    }
}

export default new PlotFunctions