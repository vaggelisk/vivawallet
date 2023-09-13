<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { RouterLink } from 'vue-router'

const userStore = useUserStore()
const cartStore = useCartStore()
</script>

<template>
  <div class="header-top">
    <div class="container">
      <div class="row">
        <!-- Begin Header Top Left Area -->
        <div class="col-lg-3 col-md-4">
          <div class="header-top-left">
            <ul class="phone-wrap">
              <li><span>Telephone Enquiry:</span><a href="#">(+30) 210 321 345</a></li>
            </ul>
          </div>
        </div>
        <!-- Header Top Left Area End Here -->
        <!-- Begin Header Top Right Area -->
        <div class="col-lg-9 col-md-8">
          <div class="header-top-right">
            <ul class="ht-menu">
              <!-- Begin Currency Area -->
              <li>
                <span class="currency-selector-wrapper">Currency :</span>
                <div class="ht-currency-trigger"><span>EUR €</span></div>
                <div class="currency ht-currency">
                  <ul class="ht-setting-list">
                    <li><a href="#">USD $</a></li>
                    <li class="active"><a href="#">EUR €</a></li>
                  </ul>
                </div>
              </li>
              <!-- Currency Area End Here -->
              <!-- Begin Language Area -->
              <li>
                <span class="language-selector-wrapper">Language :</span>
                <div class="ht-language-trigger"><span>English</span></div>
                <div class="language ht-language">
                  <ul class="ht-setting-list">
                    <li class="active">
                      <a href="#"><img src="/images/menu/flag-icon/1.jpg" alt="" />English</a>
                    </li>
                    <li>
                      <a href="#"><img src="/images/menu/flag-icon/2.jpg" alt="" />Français</a>
                    </li>
                  </ul>
                </div>
              </li>
              <!-- Language Area End Here -->
            </ul>
          </div>
        </div>
        <!-- Header Top Right Area End Here -->
      </div>
    </div>
  </div>
</template>
