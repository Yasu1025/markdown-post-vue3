import { NewUser } from '@/types/user'
import { defineStore, type _GettersTree } from 'pinia'

interface StateTypes {
  currentUserId: string | null
}

interface GettersType extends _GettersTree<StateTypes> {
  isAuthed: (state: StateTypes) => boolean
}

interface ActionsType {
  authenticate: () => void
  logout: () => void
  createUser: (newUser: NewUser) => void
}

export const useUsers = defineStore<
  string,
  StateTypes,
  GettersType,
  ActionsType
>({
  id: 'users',
  state: () => ({
    currentUserId: null,
  }),
  getters: {
    isAuthed(state) {
      return Boolean(state.currentUserId)
    },
  },
  actions: {
    async authenticate() {
      try {
        const res = await window.fetch('/api/current-user', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          },
        })

        const result = await res.json()
        this.currentUserId = result.id
      } catch (error) {
        this.currentUserId = null
      }
    },
    async logout() {
      const res = await window.fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      })

      console.log('Created new user!!', res)
      this.authenticate()
    },
    async createUser(newUser) {
      const body = JSON.stringify(newUser)
      const res = await window.fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body,
      })

      console.log('Created new user!!', res)
      this.authenticate()
    },
  },
})
