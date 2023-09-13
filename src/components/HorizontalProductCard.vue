<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { RouterLink } from 'vue-router'

defineProps<{
  product: {
    id: number
    name: string
    price: number
    description: string
    category: string
    image: string
    rating: {
      rate: number
      count: number
    }
  }
}>()

const cartStore = useCartStore()
</script>

<template>
  <div class="row product-layout-list last-child">
    <div class="col-lg-3 col-md-5">
      <div class="product-image">
        <RouterLink :to="`/`">
          <div :style="{ padding: '0 20px' }">
            <img :src="`/images/product/`+product.image+`.jpg`" :alt="product.image" />
          </div>
        </RouterLink>
        <span class="sticker">New</span>
      </div>
    </div>
    <div class="col-lg-5 col-md-7">
      <div class="product_desc">
        <div class="product_desc_info">
          <div class="product-review">
            <h5 class="manufacturer">
              <RouterLink :to="`/`">{{
                product.category
              }}</RouterLink>
            </h5>
            <div class="rating-box">
              <ul class="rating">
                <li><i class="fa fa-star-o"></i></li>
                <li><i class="fa fa-star-o"></i></li>
                <li><i class="fa fa-star-o"></i></li>
                <li class="no-star"><i class="fa fa-star-o"></i></li>
                <li class="no-star"><i class="fa fa-star-o"></i></li>
              </ul>
            </div>
          </div>
          <h4>
            <RouterLink
              class="product_name"
              :to="`/`"
              >{{ product.name }}</RouterLink
            >
          </h4>
          <div class="price-box">
            <span class="new-price">${{ product.price }}</span>
          </div>
          <p :style="{ marginTop: '4px' }">{{ product.description }}</p>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="shop-add-action">
        <ul class="add-actions-link">
          <li class="add-cart">
            <a href="#" @click="() => cartStore.addToCart(product, 1)">Add to cart</a>
          </li>
          <li class="wishlist">
            <a href="#"><i class="fa fa-heart-o"></i>Add to wishlist</a>
          </li>
          <li>
            <a class="quick-view" data-toggle="modal" data-target="#exampleModalCenter" href="#"
              ><i class="fa fa-eye"></i>Quick view</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
