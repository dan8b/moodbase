import {gsap} from 'gsap'


class Animator{
    shiftX(passRef, quadrant) {
        if (quadrant === "two" || quadrant === "four"){
                gsap.to(passRef,{x:"-35vw",duration:.5})       
            }
            else {
                console.log(passRef)
                gsap.to(passRef,{x:"-15vw",duration:.5})
            }
    }
    shiftY(passRef, quadrant) {
        switch(quadrant){
            case "one":
                gsap.to(passRef, {y:"38vw", duration:.5})
                gsap.to(passRef, {x:"10%", duration:.5})
                break
            case "two":
                gsap.to(passRef, {y:"38vw", duration:.5})
                break
            default:
                gsap.to(passRef,{y:"18vw",duration:.5})
            }
    }
}
export default new Animator();

