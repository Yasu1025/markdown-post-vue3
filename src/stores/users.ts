import { NewUser } from '@/types/user'
import { defineStore, type _GettersTree } from 'pinia'

interface StateTypes {}

interface GettersType extends _GettersTree<StateTypes> {}

interface ActionsType {
  createUser: (newUser: NewUser) => void
}

export const useUsers = defineStore<
  string,
  StateTypes,
  GettersType,
  ActionsType
>({
  id: 'users',
  state: () => ({}),
  getters: {},
  actions: {
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
    },
  },
})
