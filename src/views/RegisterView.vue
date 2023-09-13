<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onBeforeMount, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

onBeforeMount(() => {
  if (userStore.isAuthenticated) {
    router.push({ name: 'home' })
  }
})

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const email = ref('')
const phone = ref('')
const password = ref('')
const confirmPassword = ref('')

function validation() {
  if (firstName.value == '') {
    alert('Please enter your first name')
    return false
  } else if (lastName.value == '') {
    alert('Please enter your last name')
    return false
  } else if (username.value == '') {
    alert('Please enter your username')
    return false
  } else if (email.value == '') {
    alert('Please enter your email')
    return false
  } else if (phone.value == '') {
    alert('Please enter your phone')
    return false
  } else if (password.value == '') {
    alert('Please enter your password')
    return false
  } else if (confirmPassword.value == '') {
    alert('Please enter your confirm password')
    return false
  } else if (password.value != confirmPassword.value) {
    alert('Password and Confirm Password do not match')
    return false
  } else {
    return true
  }
}

function resetField() {
  firstName.value = ''
  lastName.value = ''
  username.value = ''
  email.value = ''
  phone.value = ''
  password.value = ''
  confirmPassword.value = ''
}

function register(event: Event) {
  event.preventDefault()
  if (validation()) {
    alert('Register success! But you cannot login by this account.')
    resetField()
    router.push({ name: 'login' })
  }
}
</script>

<template>
  <!-- Begin Vangelis' Breadcrumb Area -->
  <div class="breadcrumb-area">
    <div class="container">
      <div class="breadcrumb-content">
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li class="active">Register</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- Vangelis' Breadcrumb Area End Here -->
  <!-- Begin Login Content Area -->
  <div class="page-section mb-60">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-6 col-xs-12 mx-auto mt-4">
          <form @submit="register" action="#">
            <div class="login-form">
              <h4 class="login-title">Register</h4>
              <div class="row">
                <div class="col-md-6 col-12 mb-20">
                  <label>First Name*</label>
                  <input
                    class="mb-0"
                    type="text"
                    placeholder="First Name"
                    required
                    v-model="firstName"
                  />
                </div>
                <div class="col-md-6 col-12 mb-20">
                  <label>Last Name*</label>
                  <input
                    class="mb-0"
                    type="text"
                    placeholder="Last Name"
                    required
                    v-model="lastName"
                  />
                </div>
                <div class="col-md-12 mb-20">
                  <label>Username*</label>
                  <input
                    class="mb-0"
                    type="text"
                    placeholder="Username"
                    required
                    v-model="username"
                  />
                </div>
                <div class="col-md-12 mb-20">
                  <label>Email Address*</label>
                  <input
                    class="mb-0"
                    type="email"
                    placeholder="Email Address"
                    required
                    v-model="email"
                  />
                </div>
                <div class="col-md-12 mb-20">
                  <label>Phone*</label>
                  <input class="mb-0" type="text" placeholder="Phone" required v-model="phone" />
                </div>
                <div class="col-md-6 mb-20">
                  <label>Password*</label>
                  <input
                    class="mb-0"
                    type="password"
                    placeholder="Password"
                    required
                    v-model="password"
                  />
                </div>
                <div class="col-md-6 mb-20">
                  <label>Confirm Password*</label>
                  <input
                    class="mb-0"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    v-model="confirmPassword"
                  />
                </div>
                <div class="col-12">
                  <button class="register-button mt-0">Register</button>
                </div>
                <div class="col-md-8 mt-10">
                  Already have an account? <RouterLink to="/login">Login here</RouterLink>
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
