<script setup lang="ts"></script>

<template>
  <div class="navbar">
    <div class="navbar-end">
      <div class="buttons">
        <RouterLink to="/posts/new" class="button">New Post</RouterLink>
        <button class="button">Log Out</button>
      </div>

      <!-- <div v-else class="buttons">
        <button class="button" @click="modal.showModal('signUp')">Sign Up</button>
        <button class="button" @click="modal.showModal('signIn')">Sign In</button>
      </div> -->
    </div>
  </div>

  <!-- <Teleport to="#modal">
    <component :is="modal.component.value" />
  </Teleport> -->
</template>
