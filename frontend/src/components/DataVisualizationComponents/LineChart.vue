<script>
import { Line } from 'vue3-chart-v2'

export default{
    extends: Line,
    props:{
        chartDataObj:Object
    },
    data() {
        return { 
        optionsObj:{
                responsive:false,
    
                    title: {
                        display:  true,
                        text: "",
                    },

                scales: {
                    yAxes: [{
                        gridLines: {display: false},
                        scaleLabel: {
                            display:false,
                            labelString: "variable recorded",
                        },
                        ticks: {
                            min: -7,
                            max: +7,
                            stepSize: 1
                            
                        }
                    }],
                    xAxes: [{
                        display:false,
                        gridLines: { display: false},
                        scaleLabel:{ 
                            display:false,
                            labelString: "time recorded",
                        },
                        type: 'time',

                    }]
                }}
    }
  },
  async mounted() {
    this.renderChart(this.chartDataObj,this.optionsObj)
  }
}
</script>
