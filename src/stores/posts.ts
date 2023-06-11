import { Post, TimelinePost } from '@/types/posts'
import { defineStore, type _GettersTree } from 'pinia'
import { DateTime } from 'luxon'
import { Period } from '@/consts/consts'

// TODO: Delete
const dummyData = [
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
}

export const usePosts = defineStore<
  string,
  StateTypes,
  GettersType,
  ActionsType
>({
  id: 'posts',
  state: () => ({
    ids: ['1', '2', '3'],
    allPosts: new Map([
      ['1', dummyData[0]],
      ['2', dummyData[1]],
      ['3', dummyData[2]],
    ]),
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
  },
})
