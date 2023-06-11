<script setup lang="ts">
import { Post } from '@/types/posts'

defineProps<{
  post: Post
}>()
</script>

<template>
  <a
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
  >
    <span>{{ post.title }}</span>
    <span>{{ post.createdAt }}</span>
  </a>
</template>
