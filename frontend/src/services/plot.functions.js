import FetchFunctions from "./fetch.service"

class PlotFunctions extends FetchFunctions{
    transformCoordinates(coordinates){
        const transformedCoordinates=
        {
          x:0,
          y:0
        }
          if ((coordinates.x)<10){
            transformedCoordinates.x=0
          }
          else {
            transformedCoordinates.x=(coordinates.x-300)*(7/300) 
          }
          if (coordinates.y<10){
            transformedCoordinates.y=0
    
          }
          else {
            transformedCoordinates.y=(coordinates.y-300)*(-7/300) 
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

        const signX=Math.sign(transformedCoordinates.x)
    
        const signY=Math.sign(transformedCoordinates.y)
        
        coordinatePair.x={magnitude:Math.round(Math.abs(transformedCoordinates.x)),sign:signX}
        coordinatePair.y={magnitude:Math.round(Math.abs(transformedCoordinates.y)),sign:signY}
    
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