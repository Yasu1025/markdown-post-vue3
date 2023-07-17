<script setup lang="ts">
import { length, required, validate } from '@/validation'
import { ref, computed } from 'vue'
import FormInput from './input/FormInput.vue'
import { NewUser } from '@/types/user'

defineProps<{
  error?: string
}>()

const emit = defineEmits<{
  (event: 'submit', payload: NewUser): void
}>()

const userName = ref('')
const password = ref('')

const userNameStatus = computed(() => {
  return validate(userName.value, [required, length({ min: 5, max: 10 })])
})
const passwordStatus = computed(() => {
  return validate(password.value, [required, length({ min: 10, max: 40 })])
})

const isInvalid = computed<boolean>(() => {
  return !userNameStatus.value.valid || !passwordStatus.value.valid
})

const handleSubmit = async () => {
  if (isInvalid.value) return
  const newUser: NewUser = {
    username: userName.value,
    password: password.value,
  }

  try {
    emit('submit', newUser)
  } catch (error) {}
}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput
      name="Username"
      type="text"
      v-model="userName"
      :status="userNameStatus"
    />
    <FormInput
      name="Password"
      type="password"
      v-model="password"
      :status="passwordStatus"
    />
    <div v-if="error" class="is-danger help">{{ error }}</div>
    <button class="button" :disabled="isInvalid">Submit</button>
  </form>
</template>

<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 40px;
}
</style>
