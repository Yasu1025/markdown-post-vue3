<script setup lang="ts">
import { useModal } from '@/composables/modal'

const modal = useModal()
</script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <RouterLink to="/posts/new" class="button">New Post</RouterLink>
        <button class="button">Log Out</button>
      </div>
      <button class="button" @click="modal.showModal">Sign Up</button>

      <!-- <div v-else class="buttons">
        <button class="button" @click="modal.showModal('signUp')">Sign Up</button>
        <button class="button" @click="modal.showModal('signIn')">Sign In</button>
      </div> -->
    </div>
  </div>

  <Teleport to="#modal">
    <!-- <component :is="modal.component.value" /> -->
    Hi Hi
  </Teleport>
</template>
