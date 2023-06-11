<script setup lang="ts">
import { usePosts } from '@/stores/posts'
import TimelinePost from '@/components/TimelinePost.vue'
import { periods } from '@/consts/consts'

const usePostsStore = usePosts()
await usePostsStore.fetchPosts()
</script>

<template>
  <nav class="is-primary panel">
    <div class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === usePostsStore.selectedPeriod }"
        @click="usePostsStore.setSelectedPeriod(period)"
      >
        {{ period }}
      </a>
    </div>
    <div v-if="usePostsStore.filteredPosts.length">
      <TimelinePost
        v-for="post of usePostsStore.filteredPosts"
        :key="post.id"
        :post="post"
      />
    </div>
    <div v-else>No posts yet...</div>
  </nav>
</template>
