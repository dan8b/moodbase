<template>
  <svg width="800" height="800" ref="svgRef">
     <g id="Rectangle_16" data-name="Rectangle 16" stroke="#707070" stroke-width="1" fill="red" style="mix-blend-mode: color;isolation: isolate">
    <rect width="700" height="100" stroke="none"/>
  </g>
    <g class="x-axis" />
    <g class="y-axis"/>
  </svg>
</template>

<script>
import { onMounted, ref } from "vue";
import {
  select,
  // line,
  scaleLinear,
  // min,
  // max,
  // curveBasis,
  axisBottom,
  axisLeft,
  
} from "d3";

export default {
  name: 'UserLineChart',
  props: {
    data: {
      required: true,
      type: Array,
    },
  },
  setup(props){
  const svgRef=ref()

  onMounted( () => {
    const svg = select(svgRef.value);

        // scales: map index / data values to pixel values on x-axis / y-axis
//range currently hardcoded, will address / make design responsive later
    const xScale = scaleLinear()
      .domain([0,props.data.length - 1])
      .range([0, 700])

    const yScale = scaleLinear()
      .domain([-7,7])
      .range([700,0])

        // line generator: D3 method to transform an array of values to data points ("d") for a path element
    // const lineGen = line()
    //   .curve(curveBasis)
    //   .x((_,i) => xScale(i))
    //   .y((v) => 
      
    //   {
    //     console.log(v)
    //     return yScale(v)}
    //     )

        // render path element with D3's General Update Pattern
    // svg
    //   .selectAll(".happyLine") // get all "existing" lines in svg
    //   .data([props.data]) // sync them with our data
    //   .join("path") // create a new "path" for new pieces of data (if needed)
    //      // everything after .join() is applied to every "new" and "existing" element
    //   .attr("class", "line") // attach class (important for updating)
    //   .attr("stroke", "green") // styling
    //   .attr("fill","none")
    //   .attr("stroke-width",1)
    //   .attr("d", lineGen); // shape and form of our line!
        // render axes with help of scales
        // (we let Vue render our axis-containers and let D3 populate the elements inside it)
    //     svg
    //   .selectAll(".calmLine") // get all "existing" lines in svg
    //   .data([props.data]) // sync them with our data
    //   .join("path") // create a new "path" for new pieces of data (if needed)
    //      // everything after .join() is applied to every "new" and "existing" element
    //   .attr("class", "line") // attach class (important for updating)
    //   .attr("stroke", "blue") // styling
    //   .attr("fill","none")
    //   .attr("stroke-width",1)
    //   .attr("d", lineGen); // shape and form of our line!
    // // drawing circles 
    svg
    .selectAll(".circle")
      .data(props.data)
      .enter()
      .append("circle")
        .attr("fill", "red")
        .attr("stroke", "none")
        .attr('cx', (_,i) =>
           { return xScale(i)} )
        .attr('cy',(d) => 
          {
            return yScale((d))})
        .attr("r", 10)
        .on("click",(e) => {
          var t =Math.round(xScale.invert(e.x))
          console.log(props.data[t-1])
        })
    
    const xAxis = axisBottom(xScale).tickValues([])

    svg
      .select(".x-axis")
      .style("transform", `translateY(350px)`) // position on the bottom
      .call(xAxis);
    
    const yAxis = axisLeft(yScale);
    
    svg
      .select(".y-axis")
      .style("transform",`translateX(100px)`)
      .call(yAxis);
    });
    // return refs to make them available in template
    return { svgRef  };
  },
}



</script>



<style lang="sass">
.line
  margin: 25px
  &__line
    fill: none
    stroke: #76BF8A
    stroke-width: 3px
</style>

