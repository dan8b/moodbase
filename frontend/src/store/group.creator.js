import GroupFunctions from '@/services/group.service.js'

export const groupCreator = {
  namespaced: true,
  state: {
    formData: {
      groupName: '',
      groupMembers: [],
      groupColors: {},
      groupWeights: []
    },
    phaseOfCreation: 0,
    pastPhases: []
  },
  actions: {
    validateGroupName ({ commit }, name) {
      return GroupFunctions.post({}, '/checkgroupname' + name)
        .then(
          async response => {
            if ('success' in response) {
              console.log(response)
              commit('setName', name)
            }
          }
        )
    }
  },
  mutations: {
    setName (state, name) {
      state.formData.groupName = name
      state.pastPhases.push('groupName')
      state.phaseOfCreation++
    },
    addMember (state, memberName) {
      state.formData.groupMembers.push(memberName)
    },
    confirmMembers (state) {
      state.pastPhases.push('groupMembers')
      state.phaseOfCreation++
    }
  }
}
