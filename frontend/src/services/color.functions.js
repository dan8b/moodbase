import FetchFunctions from "./fetch.service"

class ColorFunctions extends FetchFunctions{
    formatColorData() {
        return this.get('plot/popularcolors').then(response=>response.json())
        }      
    hexToRgbA(hex,opacity){
        var c;
        if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
            c= hex.substring(1).split('');
            if(c.length== 3){
                c= [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c= '0x'+c.join('');
             
            return 'rgba('+[(c>>16)&255 , (c>>8)&255 , c&255].join(', ')+', '+opacity+')';
        }
        throw new Error('Bad Hex');
    }
    invertColor(rgbColor) {
        var invertedString='rgba('
        rgbColor.forEach(colorValue =>
        {
            colorValue=255-colorValue
            invertedString=invertedString+colorValue+','
        })
        invertedString=invertedString.slice(0,-1)
        invertedString=invertedString+')'
        return invertedString
    }
    createGradientString(color, interval) {
        var colorString=""
        for (var i=interval[0]; i<interval[1]; i += 7){
            colorString = colorString+this.hexToRgbA(color,i/100)+" "+i+"%, "
        }
        return colorString           
    }
}
    

export default new ColorFunctions