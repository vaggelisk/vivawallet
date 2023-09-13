<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onBeforeMount, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const username = ref('')
const password = ref('')
const loading = ref(false)

function validation() {
  if (username.value === '') {
    alert('Please enter username')
    return false
  } else if (password.value === '') {
    alert('Please enter password')
    return false
  }
  return true
}

function submitForm(event: Event) {
  event.preventDefault()
  if (validation()) {
    loading.value = true
    fetchLogin()
  }
}

function fetchLogin() {
  const url = 'https://fakestoreapi.com/auth/login'
  const data = {
    username: username.value,
    password: password.value
  }
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (!res.ok) {
        alert('Username or password is incorrect')
        throw new Error('Network response was not ok')
      }
      return res.json()
    })
    .then((response) => {
      fetchProfile(response.token)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
    .finally(() => {
      password.value = ''
      loading.value = false
    })
}

function fetchProfile(token: string) {
  const tmpData: {
    sub: number
    user: string
    iat: number
  } = JSON.parse(atob(token.split('.')[1]))
  const url = `https://fakestoreapi.com/users/${tmpData.sub}`
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: token
    }
  })
    .then((res) => res.json())
    .then((response) => {
      userStore.login(token, response)
      alert('Login success')
      router.push({ name: 'home' })
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

onBeforeMount(() => {
  if (userStore.isAuthenticated) {
    router.push({ name: 'home' })
  }
})

watch(useUserStore, () => {
  if (userStore.isAuthenticated) {
    router.push({ name: 'home' })
  }
})
</script>

<template>
  <!-- Begin Vangelis' Breadcrumb Area -->
  <div class="breadcrumb-area">
    <div class="container">
      <div class="breadcrumb-content">
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li class="active">Login</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- Vangelis' Breadcrumb Area End Here -->
  <!-- Begin Login Content Area -->
  <div class="page-section mb-60">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-xs-12 col-lg-6 mx-auto mt-4">
          <!-- Login Form s-->
          <form @submit="submitForm" action="#">
            <div class="login-form">
              <h4 class="login-title">Login</h4>
              <div class="row">
                <div class="col-md-12 col-12 mb-20">
                  <label>Username*</label>
                  <input
                    class="mb-0"
                    type="text"
                    placeholder="Username"
                    v-model="username"
                    :readonly="loading"
                  />
                </div>
                <div class="col-12 mb-20">
                  <label>Password*</label>
                  <input
                    class="mb-0"
                    type="password"
                    placeholder="Password"
                    v-model="password"
                    :readonly="loading"
                  />
                </div>
                <div class="col-md-12">
                  <button class="register-button mt-0" :disabled="loading">Login</button>
                </div>
                <div class="col-md-8 mt-10">
                  Don't have an account? <RouterLink to="/register">Register here</RouterLink>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Login Content Area End Here -->
</template>
