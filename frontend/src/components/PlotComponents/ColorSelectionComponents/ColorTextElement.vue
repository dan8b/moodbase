<template>
    <transition
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut animate__faster" >
        <div v-if="variableMatch">
            <span>  {{variable}} is a
                <text :style="styleVar"> {{ colorName }} </text> color
            </span>
            <br>
            <button @click="decideVar(buttonText)"> {{ buttonText }} </button>
            <button @click="resetVar" v-if="variableMatch2"> Wait, nevermind </button>
            <button v-if="listLayer===1" @click="previousLayer"> (back to family list) </button>
        </div>
    </transition>

</template>

<script>
export default {
  name: 'ColorTextElement',
  props: {
    variable: {
      required: true,
      type: String
    }
  },
  computed: {
    listLayer () {
      return this.$store.state.currentMoodColors.listLayer
    },
    textColor () {
      return this.$store.state.currentMoodColors.colorProfile[this.variable]
    },
    styleVar () {
      return {
        '--color': this.textColor
      }
    },
    variableMatch () {
      var toShow = true
      const curVar = this.$store.state.currentMoodColors.variableSelection
      if (curVar != this.variable && curVar != '') {
        toShow = false
      }
      return toShow
    },
    variableMatch2 () {
      var toShow = false
      const curVar = this.$store.state.currentMoodColors.variableSelection
      if (curVar === this.variable) {
        toShow = true
      }
      return toShow
    },
    colorName () {
      var val = ''
      const list = this.$store.state.auth.listOfColors
      for (const k of Object.keys(list)) {
        if (this.textColor in list[k]) {
          val = list[k][this.textColor]
        }
      }
      return val
    },
    buttonText () {
      var buttonText = 'Gross, change it!'
      if (this.variableMatch2 === true) {
        buttonText = 'Yes, this one!'
      }
      return buttonText
    }
  },
  methods: {
    decideVar (b) {
      if (b === 'Yes, this one!') {
        return this.$store.getters['currentMoodColors/sendColorChange'].then(() => {
          this.$store.commit('currentMoodColors/setVariableToChange', '')
          this.$store.commit('currentMoodColors/afterSendingChange')
        })
      } else {
        this.$store.commit('currentMoodColors/setVariableToChange', this.variable)
        this.$store.commit('currentMoodColors/holdOriginalColor')
      }
    },
    resetVar () {
      this.$store.commit('currentMoodColors/returnOriginalColor')
      this.$store.commit('currentMoodColors/setVariableToChange', '')
      this.$store.commit('currentMoodColors/changeLayer')
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
