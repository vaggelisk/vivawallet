<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderTop from '@/components/layout/HeaderTop.vue'
import HeaderMiddle from '@/components/layout/HeaderMiddle.vue'
import HeaderBottom from '@/components/layout/HeaderBottom.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <div class="body-wrapper">
    <!-- Begin Header Area -->
    <header>
      <!-- Begin Header Top Area -->
      <HeaderTop />
      <!-- Header Top Area End Here -->
      <!-- Begin Header Middle Area -->
      <HeaderMiddle />
      <!-- Header Middle Area End Here -->
      <!-- Begin Header Bottom Area -->
      <HeaderBottom />
      <!-- Header Bottom Area End Here -->
      <!-- Begin Mobile Menu Area -->
      <div class="mobile-menu-area d-lg-none d-xl-none col-12">
        <div class="container">
          <div class="row">
            <div class="mobile-menu"></div>
          </div>
        </div>
      </div>
      <!-- Mobile Menu Area End Here -->
    </header>

    <RouterView />

    <!-- Begin Footer Area -->
    <Footer />
    <!-- Footer Area End Here -->
  </div>
</template>
