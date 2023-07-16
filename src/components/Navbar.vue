<script setup lang="ts">
import { useModal } from '@/composables/modal'
import SignupForm from './SignupForm.vue'
import { useUsers } from '@/stores/users'

const modal = useModal()

const usersStore = useUsers()
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div v-if="usersStore.isAuthed" class="buttons">
        <RouterLink to="/posts/new" class="button">New Post</RouterLink>
        <button class="button" @click="usersStore.logout">Log out</button>
      </div>
      <div v-else class="buttons">
        <button class="button" @click="modal.showModal">Sign up</button>
        <button class="button" @click="modal.showModal">Sign in</button>
      </div>

      <!-- <div v-else class="buttons">
        <button class="button" @click="modal.showModal('signUp')">Sign Up</button>
        <button class="button" @click="modal.showModal('signIn')">Sign In</button>
      </div> -->
    </div>
  </div>

  <Teleport to="#modal">
    <SignupForm />
  </Teleport>
</template>
