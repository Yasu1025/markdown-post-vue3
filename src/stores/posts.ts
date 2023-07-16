import { Post, TimelinePost } from '@/types/posts'
import { defineStore, type _GettersTree } from 'pinia'
import { DateTime } from 'luxon'
import { Period } from '@/consts/consts'

interface StateTypes {
  ids: string[]
  allPosts: Map<String, Post>
  selectedPeriod: Period
}

interface GettersType extends _GettersTree<StateTypes> {
  filteredPosts: (state: StateTypes) => TimelinePost[]
}

interface ActionsType {
  setSelectedPeriod: (period: Period) => void
  fetchPosts: () => void
  createPost: (post: TimelinePost) => void
}

export const usePosts = defineStore<
  string,
  StateTypes,
  GettersType,
  ActionsType
>({
  id: 'posts',
  state: () => ({
    ids: [],
    allPosts: new Map(),
    selectedPeriod: 'Today',
  }),
  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
        .map(id => {
          const post = state.allPosts.get(id)

          if (!post) {
            throw Error(`Post with id of ${id} was expected but not found.`)
          }

          return {
            ...post,
            createdAt: DateTime.fromISO(post.createdAt),
          }
        })
        .filter(post => {
          if (state.selectedPeriod === 'Today') {
            return post.createdAt >= DateTime.now().minus({ day: 1 })
          }

          if (state.selectedPeriod === 'This Week') {
            return post.createdAt >= DateTime.now().minus({ week: 1 })
          }

          return post
        })
    },
  },
  actions: {
    setSelectedPeriod(period) {
      this.selectedPeriod = period
    },
    async fetchPosts() {
      console.log('Posts Fetching....')
      const res = await window.fetch('http://localhost:8000/posts')
      const data = (await res.json()) as Post[]
      let ids: string[] = []
      let allPosts = new Map<string, Post>()
      for (const post of data) {
        ids = [...ids, post.id]
        allPosts.set(post.id, post)
      }

      this.ids = ids
      this.allPosts = allPosts
    },
    async createPost(newPost: TimelinePost) {
      const body = JSON.stringify({
        ...newPost,
        createdAt: newPost.createdAt.toISO(),
      })
      const res = await window.fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body,
      })

      console.log('Posted new note!!', res)
    },
  },
})
