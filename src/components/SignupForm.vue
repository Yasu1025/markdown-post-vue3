<script setup lang="ts">
import UserForm from '@/components/UserForm.vue'
import { useUsers } from '@/stores/users'
import { useModal } from '@/composables/modal'
import { NewUser } from '@/types/user'

const usersStore = useUsers()
const modal = useModal()

const handleSignUp = async (newUser: NewUser) => {
  await usersStore.createUser(newUser)
  modal.hideModal()
}
</script>

<template>
  <UserForm @submit="handleSignUp" />
</template>
