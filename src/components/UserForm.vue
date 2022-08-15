<script lang="ts" setup>
import { computed,ref } from '@vue/reactivity';
import FormInput from './FormInput.vue';
import { validate, length, required } from '../validation';
import { NewUser } from '../users'
import { useUsers} from '../stores/users'
import { useModal } from '../composables/modal';

const props = defineProps<{
  error?: string
}>()

const emit = defineEmits<{
  (event: 'submit', payload: NewUser): void
}>() 

const usersStore = useUsers()
const modal = useModal()

const username = ref('')
const password = ref('')

const usernameStatus = computed(() =>{
  return validate(username.value, [required, length({min:5, max:10})])
})

const passwordStatus = computed(() =>{
  return validate(password.value, [required, length({min:10, max:40})])
})

const isInvalid = computed(() =>{
  return (!usernameStatus.value.valid || !passwordStatus.value.valid)
})

async function handleSubmit(){
  if(isInvalid.value) return

  const newUser: NewUser = {
    username: username.value,
    password: password.value
  }

  try {
    emit('submit', newUser)
  } catch (e) {
    
  }
  
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput name="Username" type="text" v-model="username" :status="usernameStatus"/>
    <FormInput name="Password" type="password" v-model="password" :status="passwordStatus"/>
    <div v-if="error" class="is-danger help"> {{error}}</div>
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>
</template>

<style scoped>

.form{
  background-color: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
