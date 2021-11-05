// import GroupFunctions from '@/services/group.service.js'

export const groupCreator = {
  namespaced: true,
  state: {
    allFormData: {},
    phaseList: ['name'],
    currentPhase: 'name',
    confirmColorChange: false
  },
  mutations: {
    nextForm (state, formData) {
      state.allFormData[state.currentPhase] = formData.formValues
      state.phaseList.push(formData.nextFormName)
      state.currentPhase = formData.nextFormName
    },
    previousForm (state) {
      console.log(state)
    },
    readyToConfirmColorChange (state) {
      state.confirmColorChange = true
    }
  }
}
