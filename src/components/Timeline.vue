<script setup lang="ts">
import { DateTime } from 'luxon'
import { Post } from '@/types/posts'
import TimelinePost from '@/components/TimelinePost.vue'

// dummy data
const posts: Post[] = [
  {
    id: '1',
    title: 'Test Post01',
    createdAt: DateTime.now().toISO(),
  },
  {
    id: '2',
    title: 'Test Post02',
    createdAt: DateTime.now().minus({ days: 5 }).toISO(),
  },
  {
    id: '3',
    title: 'Test Post03',
    createdAt: DateTime.now().minus({ weeks: 3 }).toISO(),
  },
]
</script>

<template>
  <nav class="is-primary panel">
    <div class="panel-tabs">
      <a>Today</a>
      <a>This Week</a>
      <a>This Month</a>
    </div>
    <div>
      <TimelinePost v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </nav>
</template>
