<script>
import { Line } from 'vue3-chart-v2'

export default{
      extends: Line,
  props: {
    // chartdata: {
    //   type: Object,
    //   default: null
    // },
    // options: {
    //   type: Object,
    //   default: null
    //   },
  },
  data() {
    return { 
      chartDataObj:{},
      optionsObj:{
            responsive:false,
   
                title: {
                    display:  true,
                    text: "",
                },

            scales: {
                yAxes: [{
                    scaleLabel: {
                        display:true,
                        labelString: "variable recorded",
                    },
                    ticks: {
                        min: -7,
                        max: +7,
                        stepSize: 1
                        
                    }
                }],
                xAxes: [{
                    scaleLabel:{ 
                        display:true,
                        labelString: "time recorded",
                    },
                    type: 'time',

                }]
            }}
    }
  },
  async mounted() {

        await this.$store.dispatch('userData/retrieveClickData')
        this.chartDataObj= await this.$store.getters['userData/returnChartData']   
        this.renderChart(this.chartDataObj,this.optionsObj)
  }
}
</script>
