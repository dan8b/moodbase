<template>
  <svg viewBox="-10 0 100 100" ref="svgRef">
    <div background-color="blue" width="50%" height="50%" />
    <!-- <rect width="100%" y="7%" height="7%" fill="blue" /> -->
    <g class="x-axis" />
    <g class="y-axis"/>
  </svg>

</template>

<script>
// import ColorFunctions from '@/services/color.functions.js'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'
import {
  select,

  // line,
  scaleLinear,
  // min,
  // max,
  // curveBasis,
  axisBottom,
  axisLeft

} from 'd3'

export default {
  name: 'UserScatterPlot',
  props: {
    data: {
      required: true,
      type: Object
    },
    chosenVariables: {
      type: Object
    }
  },
  setup (props) {
    const svgRef = ref()

    onMounted(() => {
      const svg = select(svgRef.value)
      const t = svg.attr('viewBox').split(' ')
      var width = t[2]
      var height = t[3]

      // svg.on("wheel",( width => { console.log(i++)}))

      const xScale = scaleLinear()
        .domain([0, props.data.count - 1])
        .range([0, width])

      const yScale = scaleLinear()
        .domain([-7, 7])
        .range([height, 0])

      const colors = useStore().state.currentMoodColors.colorProfile

      function dotColor (dotData, variable) {
        if (dotData < 0) {
          if (variable === 'happiness') {
            return colors.happiness
          }
          return colors.calm
        } else if (variable === 'calm') {
          return colors.anxiety
        }
      }

      // function drawGradients(box,variable,switch){
      //     for (let i = 0; i<14; i++){
      //       svg.append("rect")
      //         .attr("y",String(i*7))
      //         .attr("width", "100%")
      //         .attr("height", "7%")
      //         .attr("fill", "pink");
      //       }
      // }
      const xAxis = axisBottom(xScale).tickValues([])

      for (const v of Object.keys(props.chosenVariables)) {
        if (props.chosenVariables[v] === true) {
        // drawGradients(svg,v,seen)
          svg
            .selectAll('.circle')
            .data(props.data[v])
            .enter()
            .append('circle')
            .attr('fill', (d) => { return dotColor(d, v) })
            .attr('stroke', 'none')
            .attr('cx', (_, i) => { return xScale(i) })
            .attr('cy', (d) => { return yScale((d)) })
            .attr('r', 1)
        }
      }

      svg
        .select('.x-axis')
        .style('transform', 'translateY(50%)')
        .call(xAxis)

      const yAxis = axisLeft(yScale).tickValues([])

      svg
        .select('.y-axis')
        .style('font-size', '4px')
      // .style("transform",`translateX(100px)`)
        .call(yAxis)
    })

    // return refs to make them available in template
    return { svgRef }
  }
}

</script>

<style scoped>

</style>
