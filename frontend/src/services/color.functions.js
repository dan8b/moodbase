import FetchFunctions from "./fetch.service"

class ColorFunctions extends FetchFunctions{
    formatColorData() {
        return this.get('plot/popularcolors').then(response=>response.json())
        }
    }

export default new ColorFunctions