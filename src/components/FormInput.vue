<script setup lang="ts">
defineProps<{
  name: string
  modelValue: string
}>()

const emit = defineEmits<{
  (event: 'update:modelVlue', value: string): void
}>()

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelVlue', value)
}
</script>

<template>
  <div class="field">
    <label :for="name" class="label">{{ name }}</label>
    <div class="control">
      <input
        type="text"
        :id="name"
        class="input"
        :value="modelValue"
        @input="handleInput"
      />
    </div>
  </div>
</template>
