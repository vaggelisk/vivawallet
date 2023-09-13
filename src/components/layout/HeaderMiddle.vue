<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { RouterLink } from 'vue-router'

const cartStore = useCartStore()
</script>

<template>
  <div class="header-middle pl-sm-0 pr-sm-0 pl-xs-0 pr-xs-0">
    <div class="container">
      <div class="row">
        <!-- Begin Header Logo Area -->
        <div class="col-lg-3">
          <div class="logo pb-sm-30 pb-xs-30">
            <RouterLink to="/">
              <img src="/images/menu/logo/vw-logo.svg" alt="" />
            </RouterLink>
          </div>
        </div>
        <!-- Header Logo Area End Here -->
        <!-- Begin Header Middle Right Area -->
        <div class="col-lg-9 pl-0 ml-sm-15 ml-xs-15">
          <!-- Begin Header Middle Left Area -->
          <form action="#" class="hm-searchbox">
            <input type="text" placeholder="Enter your search key ..." />
            <button class="li-btn" type="submit"><i class="fa fa-search"></i></button>
          </form>
          <!-- End Header Middle Right Area -->
          <!-- Begin Header Middle Right Area -->
          <div class="header-middle-right">
            <ul class="hm-menu">
              <!-- Begin Header Middle Wishlist Area -->
              <li class="hm-wishlist">
                <a href="#">
                  <span class="cart-item-count wishlist-item-count">0</span>
                  <i class="fa fa-heart-o"></i>
                </a>
              </li>
              <!-- Header Middle Wishlist Area End Here -->
              <!-- Begin Header Mini Cart Area -->
              <li class="hm-minicart">
                <div class="hm-minicart-trigger">
                  <span class="item-icon"></span>
                  <span class="item-text"
                    >€{{ cartStore.totalMoney }}
                    <span class="cart-item-count">{{ cartStore.items.length }}</span>
                  </span>
                </div>
                <span></span>
                <div v-if="cartStore.items.length === 0" class="minicart">
                  <span>Empty</span>
                </div>
                <div v-if="cartStore.items.length > 0" class="minicart">
                  <ul class="minicart-product-list">
                    <li v-for="item in cartStore.items" :key="item.product.id">
                      <RouterLink
                        :to="{ name: 'product', params: { id: item.product.id } }"
                        class="minicart-product-image"
                      >
                        <img :src="`/images/product/`+item.product.image+`.jpg`" :alt="item.product.image" />
                      </RouterLink>
                      <div class="minicart-product-details">
                        <h6>
                          <RouterLink :to="{ name: 'product', params: { id: item.product.id } }"
                            >{{ item.product.name }}</RouterLink
                          >
                        </h6>
                        <span>{{ item.product.price }} x {{ item.quantity }} €</span>
                      </div>
                      <button
                        class="close"
                        title="Remove"
                        @click="() => cartStore.removeItem(item.product)"
                      >
                        <i class="fa fa-close"></i>
                      </button>
                    </li>
                  </ul>
                  <p class="minicart-total">
                    SUBTOTAL: <span>{{ cartStore.totalMoney }} €</span>
                  </p>
                  <div class="minicart-button">
                    <RouterLink to="/cart" class="li-button li-button-fullwidth li-button-dark">
                      <span>View Full Cart</span>
                    </RouterLink>
                    <RouterLink to="/checkout" class="li-button li-button-fullwidth">
                      <span>Checkout</span>
                    </RouterLink>
                  </div>
                </div>
              </li>
              <!-- Header Mini Cart Area End Here -->
            </ul>
          </div>
          <!-- Header Middle Right Area End Here -->
        </div>
        <!-- Header Middle Right Area End Here -->
      </div>
    </div>
  </div>
</template>
