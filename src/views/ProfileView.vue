<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onBeforeMount, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

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

const router = useRouter()
const userStore = useUserStore()

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const email = ref('')
const phone = ref('')
const city = ref('')
const street = ref('')
const number = ref(0)
const zipcode = ref('')

onBeforeMount(() => {
  if (!userStore.isAuthenticated) {
    router.push({ name: 'login' })
  } else {
    firstName.value = userStore.user?.name.firstname || ''
    lastName.value = userStore.user?.name.lastname || ''
    username.value = userStore.user?.username || ''
    email.value = userStore.user?.email || ''
    phone.value = userStore.user?.phone || ''
    city.value = userStore.user?.address.city || ''
    street.value = userStore.user?.address.street || ''
    number.value = userStore.user?.address.number || 0
    zipcode.value = userStore.user?.address.zipcode || ''
  }
})

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
  } else if (city.value == '') {
    alert('Please enter your city')
    return false
  } else if (street.value == '') {
    alert('Please enter your street')
    return false
  } else if (number.value == 0) {
    alert('Please enter your number')
    return false
  } else if (zipcode.value == '') {
    alert('Please enter your zipcode')
    return false
  } else {
    return true
  }
}

function resetField() {
  firstName.value = userStore.user?.name.firstname || ''
  lastName.value = userStore.user?.name.lastname || ''
  username.value = userStore.user?.username || ''
  email.value = userStore.user?.email || ''
  phone.value = userStore.user?.phone || ''
  city.value = userStore.user?.address.city || ''
  street.value = userStore.user?.address.street || ''
  number.value = userStore.user?.address.number || 0
  zipcode.value = userStore.user?.address.zipcode || ''
}

function update(event: Event) {
  event.preventDefault()
  if (validation()) {
    const updatedUser: User = {
      address: {
        geolocation: {
          lat: userStore.user?.address.geolocation.lat || '',
          long: userStore.user?.address.geolocation.long || ''
        },
        city: city.value,
        street: street.value,
        number: number.value,
        zipcode: zipcode.value
      },
      id: userStore.user?.id || 0,
      email: email.value,
      username: username.value,
      password: userStore.user?.password || '',
      name: {
        firstname: firstName.value,
        lastname: lastName.value
      },
      phone: phone.value,
      __v: userStore.user?.__v || 0
    }
    userStore.updateUser(updatedUser)
    alert('Profile updated successfully')
    resetField()
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
          <li class="active">My Profile</li>
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
          <form @submit="update" action="#">
            <div class="login-form">
              <h4 class="login-title">My Profile</h4>
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
                  <label>City*</label>
                  <input class="mb-0" type="text" placeholder="City" required v-model="city" />
                </div>
                <div class="col-md-6 mb-20">
                  <label>Street*</label>
                  <input class="mb-0" type="text" placeholder="Street" required v-model="street" />
                </div>
                <div class="col-md-6 mb-20">
                  <label>Number*</label>
                  <input
                    class="mb-0"
                    type="number"
                    placeholder="Number"
                    required
                    v-model="number"
                  />
                </div>
                <div class="col-md-6 mb-20">
                  <label>Zipcode*</label>
                  <input
                    class="mb-0"
                    type="text"
                    placeholder="Zipcode"
                    required
                    v-model="zipcode"
                  />
                </div>
                <div class="col-12">
                  <button class="register-button mt-0" type="submit">Update Profile</button>
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
