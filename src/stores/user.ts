import { defineStore } from 'pinia'
import { ref } from 'vue'

type User = {
  address: {
    geolocation: {
      lat: string
      long: string
    }
    city: string
    street: string
    number: number
    zipcode: string
  }
  id: number
  email: string
  username: string
  password: string
  name: {
    firstname: string
    lastname: string
  }
  phone: string
  __v: number
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const token = ref('')

  function login(tokens: string, data: User) {
    user.value = data
    isAuthenticated.value = true
    token.value = tokens
  }
  function updateUser(data: User) {
    user.value = data
  }
  function logout() {
    user.value = null
    isAuthenticated.value = false
  }

  return { user, isAuthenticated, login, updateUser, logout }
})
