import FetchFunctions from './fetch.service'

class WeightFunctions extends FetchFunctions {
  updateValue () {
    console.log('hi')
  }
}

export default new WeightFunctions()
