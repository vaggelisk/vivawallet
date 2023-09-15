<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'


const cartStore = useCartStore()
const voucher = ref('')

function removeDiscount() {
  voucher.value = ''
  cartStore.removeVoucher()
}
</script>

<template>
  <!-- Begin Vangelis' Breadcrumb Area -->
  <div class="breadcrumb-area">
    <div class="container">
      <div class="breadcrumb-content">
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li class="active">Shopping Cart</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- Vangelis' Breadcrumb Area End Here -->
  <!--Shopping Cart Area Strat-->
  <div class="Shopping-cart-area pt-60 pb-60">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div v-if="cartStore.items.length > 0">
            <div class="table-content table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th class="li-product-remove">remove</th>
                    <th class="li-product-thumbnail">images</th>
                    <th class="cart-product-name">Product</th>
                    <th class="li-product-price">Unit Price</th>
                    <th class="li-product-quantity">Quantity</th>
                    <th class="li-product-subtotal">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartStore.items" :key="item.product.id">
                    <td class="li-product-remove">
                      <a href="#" @click="() => cartStore.removeItem(item.product)"
                        ><i class="fa fa-times"></i
                      ></a>
                    </td>
                    <td class="li-product-thumbnail">
                      <RouterLink :to="{ name: 'product', params: { id: item.product.id } }"
                        ><img
                          :style="{ width: '50px' }"
                          :src="`/images/product/`+item.product.image+`.jpg`"
                          alt="productImage"
                      /></RouterLink>
                    </td>
                    <td class="li-product-name">
                      <RouterLink :to="{ name: 'product', params: { id: item.product.id } }">{{
                        item.product.name
                      }}</RouterLink>
                    </td>
                    <td class="li-product-price">
                      <span class="amount">€{{ item.product.price }}</span>
                    </td>
                    <td class="quantity">
                      {{ item.quantity }}
                    </td>
                    <td class="product-subtotal">
                      <span class="amount">€{{ item.quantity * item.product.price }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="coupon-all">
                  <div class="coupon">
                    <input
                      id="coupon_code"
                      class="input-text"
                      name="coupon_code"
                      v-model="voucher"
                      placeholder="Coupon code"
                      type="text"
                    />
                    <input class="button" name="apply_coupon" value="Apply coupon" type="submit"  @click="() => cartStore.getVoucher(voucher)" />
                    <input class="button-remove" name="remove_coupon" value="REMOVE COUPON" type="submit"  @click="() => removeDiscount()" />
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-5 ml-auto">
                <div class="cart-page-total">
                  <h2>Cart totals</h2>
                  <ul>
                    <li>
                      Subtotal <span>€{{ cartStore.totalMoney }}</span>
                    </li>
                    <li>
                      Total <span>€{{ cartStore.totalMoney }}</span>
                    </li>
                  </ul>
                  <RouterLink to="/checkout">Proceed to checkout</RouterLink>
                </div>
              </div>
            </div>
          </div>
          <div v-else>Empty</div>
        </div>
      </div>
    </div>
  </div>
  <!--Shopping Cart Area End-->
</template>
