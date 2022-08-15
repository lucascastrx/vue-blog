<script setup lang="ts">
import { useUsers } from '../stores/users';
import UserForm from './UserForm.vue';
import { useModal } from '../composables/modal'
import { NewUser } from '../users';

const usersStore = useUsers()
const modal = useModal()


async function handleSignup(newUser: NewUser){

    await usersStore.createUser(newUser);
    modal.hideModal()
  }

</script>

<template>
<UserForm @submit="handleSignup"/>
</template>
