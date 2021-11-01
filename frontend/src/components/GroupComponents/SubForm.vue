<template>
<div>
    <Form :validation-schema="groupNameSchema" id="GroupNameForm" @submit="validateGroupName">
        <label  for="groupName">What's your group called? </label>
        <Field  name="groupName" type="text" /><br><br>
        <button  class="button2"  type="submit">Make my group!</button>
    </Form>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
