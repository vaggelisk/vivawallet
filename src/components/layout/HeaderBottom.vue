<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()
</script>

<template>
  <div class="header-bottom header-sticky d-none d-lg-block d-xl-block">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <!-- Begin Header Bottom Menu Area -->
          <div class="hb-menu">
            <nav>
              <ul>
                <li>
                  <RouterLink to="/">Home</RouterLink>
                </li>
                <li><RouterLink to="/cart">Cart</RouterLink></li>
              </ul>
            </nav>
          </div>
          <!-- Header Bottom Menu Area End Here -->
        </div>
      </div>
    </div>
  </div>
</template>
