<script setup lang="ts">
import { ref } from 'vue'
import UserForm from '@/components/UserForm.vue'
import { useUsers } from '@/stores/users'
import { useModal } from '@/composables/modal'
import { NewUser } from '@/types/user'

const usersStore = useUsers()
const modal = useModal()
const error = ref('')

const handleSignin = async (newUser: NewUser) => {
  const res = await usersStore.login(newUser)

  if ([401, 404].includes(res.status)) {
    error.value = 'Username or Password was incorrect'
  } else {
    usersStore.authenticate()
    modal.hideModal()
  }
}
</script>

<template>
  <UserForm @submit="handleSignin" :error="error" />
</template>
