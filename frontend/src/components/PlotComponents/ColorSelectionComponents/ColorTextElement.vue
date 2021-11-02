<template>
    <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut animate__faster" >
        <div v-if="handleButtonDisplay.showBoxAtAll">
            <span>  {{variable}} is a
                <text :style="styleVar"> {{ nameOfColor }} </text> color
            </span>
            <br>
            <button @click="handleColorChange(variable)" v-if="handleButtonDisplay.grossChangeIt"> Gross, change it!  </button>
            <button @click="postColorChange" v-if="!handleButtonDisplay.grossChangeIt && handleButtonDisplay.waitNevermind"> Yes, this one!  </button>
            <button @click="handleColorChange('')" v-if="handleButtonDisplay.waitNevermind"> Wait, nevermind </button>
            <button @click="returnToListOfSubsets" v-if="handleButtonDisplay.backToListOfSubsets" > (back to family list) </button>
        </div>
    </transition>

</template>

<script>
import ColorFunctions from '@/services/color.functions.js'
export default {
  name: 'ColorTextElement',
  props: {
    variable: {
      required: true,
      type: String
    }
  },
  beforeCreate () {
    this.$store.dispatch('plotPage/loadListOfColors')
  },
  computed: {
    currentPanelState () {
      return this.$store.state.plotPage.panelState
    },
    listOfColors () {
      return this.currentPanelState.colorList
    },
    currentSubset () {
      return this.currentPanelState.inPanelSubset
    },
    textColor () {
      return this.$store.state.plotPage.colorProfile[this.variable]
    },
    nameOfColor () {
      for (const k of Object.keys(this.listOfColors)) {
        if (this.textColor in this.listOfColors[k]) {
          return this.listOfColors[k][this.textColor]
        }
      }
      return 'Loading...'
    },
    styleVar () {
      return {
        '--color': this.textColor
      }
    },
    currentVariable () {
      return this.currentPanelState.variableSelectedForColorChange
    },
    handleButtonDisplay () {
      const whichButtonsToShow = {
        showBoxAtAll: true,
        grossChangeIt: true,
        waitNevermind: false,
        backToListOfSubsets: false
      }
      if (this.currentVariable === this.variable) {
        whichButtonsToShow.grossChangeIt = false
        whichButtonsToShow.waitNevermind = true
        if (this.currentSubset !== '') {
          whichButtonsToShow.backToListOfSubsets = true
        }
      } else if (this.currentVariable !== '') {
        whichButtonsToShow.showBoxAtAll = false
      }
      return whichButtonsToShow
    }
  },
  methods: {
    handleColorChange (value) {
      this.$store.commit('plotPage/setVariableForColorChange', value)
    },
    postColorChange () {
      const colorChangeData = {
        variable: this.currentVariable,
        colorChange: {
          family: this.currentSubset,
          hex: this.textColor
        }
      }
      console.log(colorChangeData)
      return ColorFunctions.post(colorChangeData, 'plot/changecolors')
        .then(r => r.json())
        .then(this.$store.commit('plotPage/clearPanelState'))
    },
    returnToListOfSubsets () {
      this.$store.commit('plotPage/setColorSubset', '')
    }
  }
}
</script>

<style scoped>

button {
    margin-top:5%;
    margin-bottom:5%;
}

span {
    font-size:xx-large;
}

text {
    color:var(--color);
    font-size:xx-large;
}

</style>
