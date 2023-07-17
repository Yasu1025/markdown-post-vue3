import SignupForm from '@/components/SignupForm.vue'
import SigninForm from '@/components/SigninForm.vue'
import { ref, shallowRef } from 'vue'

const show = ref(false)
const component = shallowRef()

export function useModal() {
  return {
    show,
    component,
    showModal: (type: 'signUp' | 'signIn') => {
      show.value = true
      switch (type) {
        case 'signUp':
          return (component.value = SignupForm)
        case 'signIn':
          return (component.value = SigninForm)
      }
    },
    hideModal: () => {
      show.value = false
    },
  }
}
