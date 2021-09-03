import FetchFunctions from "./fetch.service"

class PlotFunctions extends FetchFunctions{
    transformCoordinates(coordinates){
        const transformedCoordinates=
        {
          happinessVal:0,
          calmVal:0
        }
          if ((coordinates.happinessVal)<10){
            transformedCoordinates.happinessVal=0
          }
          else {
            transformedCoordinates.happinessVal=(coordinates.happinessVal-300)*(7/300) 
          }
          if (coordinates.calmVal<10){
            transformedCoordinates.calmVal=0
    
          }
          else {
            transformedCoordinates.calmVal=(coordinates.calmVal-300)*(-7/300) 
          }
        return transformedCoordinates
    }
    classifyMoodValues(coordinates){
        const transformedCoordinates=this.transformCoordinates(coordinates)
        const coordinatePair=
        {
          x:{magnitude:0,sign:0},
          y:{magnitude:0,sign:0}
        }

        const signX=Math.sign(transformedCoordinates.happinessVal)
    
        const signY=Math.sign(transformedCoordinates.calmVal)
        
        coordinatePair.x={magnitude:Math.round(Math.abs(transformedCoordinates.happinessVal)),sign:signX}
        coordinatePair.y={magnitude:Math.round(Math.abs(transformedCoordinates.calmVal)),sign:signY}
    
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
    
    
}

export default new PlotFunctions