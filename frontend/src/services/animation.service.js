import {gsap} from 'gsap'


class Animator{
    shiftX(passRef, quadrant) {
        if (quadrant === "two" || quadrant === "four"){
                gsap.to(passRef,{x:"-26vw",duration:.5})       
            }
            else {
                gsap.to(passRef,{x:"-11vw",duration:.5})
            }
    }
    shiftY(passRef, quadrant) {
        switch(quadrant){
            case "one":
                gsap.to(passRef, {y:"29vw", duration:.5})
                gsap.to(passRef, {x:"11vw", duration:.5})
                break
            case "two":
                gsap.to(passRef, {y:"29vw", duration:.5})
                break
            default:
                gsap.to(passRef,{y:"14vw",duration:.5})
            }
    }
}
export default new Animator();

