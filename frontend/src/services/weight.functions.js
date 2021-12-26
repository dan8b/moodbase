import FetchFunctions from './fetch.service'

class WeightFunctions extends FetchFunctions {
  wackyLogic (pathCoordinates) {
    return {
      x: (this.checkForZero(pathCoordinates.x)),
      y: (this.checkForZero(pathCoordinates.y))
    }
  }

  checkForZero (v) {
    if (Math.abs(v) < 0.001) {
      return 0
    } else {
      return Math.sign(v)
    }
  }

  polarToCartesian (vertexData) {
    var radius = 100
    if ('radius' in vertexData) {
      radius = vertexData.radius
    }
    const sign = {
      x: 1,
      y: 1
    }
    const theta = ((vertexData.iter) * ((Math.PI * 2) / vertexData.nGon))
    if (theta < Math.PI / 2 && theta > Math.PI * 3 / 2) {
      sign.x = -1
    }
    if (theta < Math.PI && theta > 2 * Math.PI) {
      sign.y = -1
    }
    const x = radius * sign.x * Math.cos((vertexData.iter * ((Math.PI * 2) / vertexData.nGon)))
    const y = radius * sign.x * Math.sin((vertexData.iter * ((Math.PI * 2) / vertexData.nGon)))
    return {
      x: x,
      y: y
    }
  }

  computeWiggleRoom (radii) {
    var sumRadii = 0
    for (const r of radii) {
      sumRadii += r
    }
    return 100 - sumRadii
  }
}

export default new WeightFunctions()
