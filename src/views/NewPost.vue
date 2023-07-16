<script setup lang="ts">
import PostWriter from '@/components/PostWriter.vue'
import { TimelinePost } from '@/types/posts'
import { DateTime } from 'luxon'

const timelinePost: TimelinePost = {
  id: '',
  title: '',
  createdAt: DateTime.now(),
  markdown: '',
  html: '',
}
</script>

<template>
  <div>
    <h1>New post</h1>
    <PostWriter :post="timelinePost" />
  </div>
</template>
