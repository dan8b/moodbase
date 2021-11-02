<template>
  <Form  id="SetGroupName">

    <span v-if="errorMessage!==''"> {{errorMessage}} </span>

  <!-- <div v-if="!readOnly('name')" >
    <Form :validation-schema="groupNameSchema" id="GroupNameForm" @submit="validateGroupName">
        <label  for="groupName">What's your group called? </label>
        <Field  name="groupName" type="text" /><br><br>
        <button  class="button2"  type="submit">Make my group!</button>
    </Form>
  </div>

       <br>

  <div v-if="!readOnly('members')" >
    <Form :validation-schema="memberSchema" id="MemberNames" @submit="addMemberToList">
        <label for="member">Who's in your group (email)? </label>
        <Field  name="member" type="email" /><br><br>
        <button  class="button2"  type="submit">Add this person to my group!</button>
    </Form>
  </div>

  <div v-if="listOfMembers.length>0">
    <ul  v-for="(memberName, i) in listOfMembers" :key="i">
        <li> {{memberName}} </li>
    </ul>
    <button @click="postMemberList"> Send those invites! </button>
  </div>

  <div v-if="unregisteredMembers.length>0">
    <span> Some of the people on your list are not registered users of the moodbase.
            Click the button next to an invitee's name to send them an invite to
            create an account and join your group. </span>
    <ul v-for="(unregistered,i) in unregisteredMembers" :key="i">
      <li>
        <div> {{unregistered}} <button @click="unregisteredMembers[unregistered]=true"> circle </button> </div>
      </li>
    </ul>
    <button @click="phase++"> Done </button>
  </div>

       <br> -->

  <!-- <div  >
    <div class="flexr">
        <h2> What colors will your group's emotions take? </h2>
        <button> use my colors </button>
        <button> make adjustments </button>
    </div>
    <br>
  <div class="flexr">
    <div class="flexc">
      <PlotColorPicker />

      <color-selection-panel  />

    </div>
    <div>
      <plot-grid-4 />
    </div>
  </div>
  </div>
       <br> -->

  <div v-if="!readOnly('weights')" >
    <Form>
        <label for="member">Who's in your group (email)? </label>
        <Field  name="member" type="email" /><br><br>
        <button  class="button2"  type="submit">Add this person to my group!</button>
    </Form>
  </div>

  </Form>

</template>

<script>
import { useStore } from 'vuex'
import PlotColorPicker from '@/components/PlotComponents/ColorSelectionComponents/PlotColorPicker.vue'
import PlotGrid4 from '@/components/PlotComponents/GridComponents/PlotGrid4.vue'
import GroupFunctions from '@/services/group.service.js'
import ColorSelectionPanel from '@/components/PlotComponents/ColorSelectionComponents/ColorSelectionPanel.vue'
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
export default {
  name: 'CreateGroupForm',
  components: {
    PlotGrid4,
    PlotColorPicker,
    ColorSelectionPanel,
    Form,
    Field
  },
  data () {
    return {
      activePhase: ['name', 'members', 'colors', 'weights', 'done'],
      currentPhase: 0,
      errorMessage: '',
      readyToSubmitMembers: false,
      listOfMembers: [],
      unregisteredMembers: []
    }
  },
  methods: {
    sendInvites () {
      const inviteToRegister = []
      for (const member of Object.keys(this.unregisteredMembers)) {
        if (this.unregisteredMembers[member] === true) {
          inviteToRegister.push(member)
        }
        return GroupFunctions.post({ registered: this.listOfMembers, unregistered: inviteToRegister }, '/')
      }
    },
    postMemberList () {
      return GroupFunctions.post(this.listOfMembers, '/checkmembernames')
        .then(
          async response => {
            for (const unregistered of response.unregistered) {
              this.unregisteredMembers[unregistered] = false
            }
            this.listOfMembers = response.registered
          }
        )
    },
    addMemberToList (MemberNames) {
      this.listOfMembers.push(MemberNames.name)
    },
    validateGroupName (GroupNameForm) {
      return GroupFunctions.post({}, '/checkgroupname' + GroupNameForm.groupName)
        .then(
          async response => {
            if ('success' in response) {
              this.errorMessage = ''
              this.phase++
            } else {
              this.errorMessage = response.error
            }
          }
        )
    },
    readOnly (phase) {
      if (this.activePhase[this.currentPhase] === phase) {
        return false
      }
      return true
    }
  },
  setup () {
    useStore().commit('plotPage/activateDisplayOnlyMode', true)
    const groupNameSchema = yup.object().shape({
      groupName: yup
        .string()
        .required('Username is required!')
        .min(3, 'Must be at least 3 characters!')
        .max(20, 'Must be maximum 20 characters!')
    })
    const memberSchema = yup.object().shape({
      memberEmail: yup
        .string()
        .required('Email is required!')
        .email('Email is invalid!')
        .max(30, 'Must be maximum 30 characters!')
    })
    return { groupNameSchema, memberSchema }
  }
}
</script>

<style scoped>

</style>
