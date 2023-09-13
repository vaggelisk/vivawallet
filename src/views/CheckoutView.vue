<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { onBeforeMount, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()

onBeforeMount(() => {
  if (userStore.isAuthenticated) {
    firstName.value = userStore.user?.name.firstname || ''
    lastName.value = userStore.user?.name.lastname || ''
    email.value = userStore.user?.email || ''
    address.value = userStore.user?.address.street || ''
    apartment.value = userStore.user?.address.number.toString() || ''
    postcode.value = userStore.user?.address.zipcode || ''
  }
})

const country = ref('gr')
const firstName = ref('')
const lastName = ref('')
const address = ref('')
const apartment = ref('')
const postcode = ref('')
const email = ref('')
const phone = ref('')

const cardNumber = ref('')
const cardName = ref('')
const cardExpirationDate = ref('')
const cardCvv = ref('')

const reCvv = ref(/^[0-9]{3,4}$/)
const reNumber = ref( /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)
const reName = ref( /^[a-zA-Z\s]*$/ )
const reExpirDate = ref( /^(0[1-9]|1[0-2])\/[0-9]{2}$/ )

function validation() {
  // if (firstName.value === '') {
  //   return false
  // }
  // if (lastName.value === '') {
  //   return false
  // }
  // if (address.value === '') {
  //   return false
  // }
  // if (postcode.value === '') {
  //   return false
  // }
  // if (email.value === '') {
  //   return false
  // }
  // if (cardNumber.value === '') {
  //   return false
  // }
  // if (cardExpirationDate.value === '') {
  //   return false
  // }
  // if (cardCvv.value === '') {
  //   return false
  // }
  // if (cardName.value === '') {
  //   return false
  // }
  return true
}


function cardValidation() {
    // if (!cardCvv.value.match(reCvv.value)) {
    //   return {
    //     valid: false,
    //     message: 'CVV of card is wrong'
    //   }
    // }
  if (!cardName.value.match(reName.value)) {
    return {
      valid: false,
      message: 'Name of card is wrong'
    }
  }
  let cardExpDateMonth = Number(cardExpirationDate.value.substring(0,2))
  let cardExpDateYear = Number('20' + cardExpirationDate.value.substring(3,5))
  const d = new Date();
  let nowMonth = d.getMonth()+1;
  let nowYear = d.getFullYear()
  if (!cardExpirationDate.value.match(reExpirDate.value) || cardExpDateYear<nowYear || (cardExpDateYear==nowYear && cardExpDateMonth<=nowMonth)  ) {
    return {
      valid: false,
      message: 'Expiration Date of card is wrong'
    }
  }
  let cardNumberNoSpaceOrDash: string
  cardNumberNoSpaceOrDash = cardNumber.value.replace(/\s/g, '')  // replace spaces of the credit card number
  cardNumberNoSpaceOrDash = cardNumberNoSpaceOrDash.replace(/-/g, '') // replace dashes of the credit card number
  if (!cardNumberNoSpaceOrDash.match(reNumber.value)) {
    return {
      valid: false,
      message: 'Number of card is wrong'
    }
  }
  return {
    valid: true,
    message: 'All perfect'
  }

}

function handlePlaceOrder() {
  if (!validation()) {
    alert('Please enter all required fields')
    return
  }
  if (!cardValidation().valid) {
    alert(cardValidation().message)
    return
  }
  const order = {
    country: country.value,
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    apartment: apartment.value,
    postcode: postcode.value,
    email: email.value,
    items: cartStore.items,
    totalMoney: cartStore.totalMoney
  }
  console.log(order)
  alert('Order successfully')
  cartStore.clearCart()
  router.push({ name: 'home' })
}
</script>

<template>
  <!-- Begin Vangelis' Breadcrumb Area -->
  <div class="breadcrumb-area">
    <div class="container">
      <div class="breadcrumb-content">
        <ul>
          <li><RouterLink to="/">Home</RouterLink></li>
          <li class="active">Checkout</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- Vangelis' Breadcrumb Area End Here -->
  <!--Checkout Area Strat-->
  <div v-if="cartStore.items.length > 0" class="checkout-area pt-60 pb-30">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-12">
          <form action="#">
            <div class="checkbox-form">
              <h3>Billing Details</h3>
              <div class="row">
                <div class="col-md-12">
                  <div class="country-select clearfix">
                    <label>Country <span class="required">*</span></label>
                    <select class="nice-select wide" v-model="country">
                      <option value="gr">Greece</option>
                      <option value="uk">London</option>
                      <option value="rou">Romania</option>
                      <option value="fr">French</option>
                      <option value="de">Germany</option>
                      <option value="aus">Australia</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="checkout-form-list">
                    <label>First Name <span class="required">*</span></label>
                    <input placeholder="" type="text" v-model="firstName" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="checkout-form-list">
                    <label>Last Name <span class="required">*</span></label>
                    <input placeholder="" type="text" v-model="lastName" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="checkout-form-list">
                    <label>Address <span class="required">*</span></label>
                    <input placeholder="Street address" type="text" v-model="address" />
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="checkout-form-list">
                    <input
                      placeholder="Apartment, suite, unit etc. (optional)"
                      type="text"
                      v-model="apartment"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="checkout-form-list">
                    <label>Postcode / Zip <span class="required">*</span></label>
                    <input placeholder="" type="text" v-model="postcode" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="checkout-form-list">
                    <label>Email Address <span class="required">*</span></label>
                    <input placeholder="" type="email" v-model="email" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-6 col-12">
          <div class="your-order">
            <h3>Your order</h3>
            <div class="your-order-table table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th class="cart-product-name">Product</th>
                    <th class="cart-product-total">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartStore.items" :key="item.product.id" class="cart_item">
                    <td class="cart-product-name">
                      {{ item.product.title }}<strong class="product-quantity"> × {{ item.quantity }}</strong>
                    </td>
                    <td class="cart-product-total">
                      <span class="amount">${{ item.product.price }}</span>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="cart-subtotal">
                    <th>Cart Subtotal</th>
                    <td>
                      <span class="amount">${{ cartStore.totalMoney }}</span>
                    </td>
                  </tr>
                  <tr class="order-total">
                    <th>Order Total</th>
                    <td>
                      <strong
                        ><span class="amount">${{ cartStore.totalMoney }}</span></strong
                      >
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div class="payment-method">
              <div class="payment-accordion">
                <div id="accordion">
                  <div class="card">
                    <div class="card-header" id="#payment-1">
                      <h5 class="panel-title">
                        <a
                          class=""
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          Direct Bank Transfer.
                        </a>
                      </h5>
                    </div>
                    <div id="collapseOne" class="collapse" data-parent="#accordion">
                      <div class="card-body">
                        <p>
                          Make your payment directly into our bank account. Please use your Order ID
                          as the payment reference. Your order won’t be shipped until the funds have
                          cleared in our account.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-header" id="#payment-3">
                      <h5 class="panel-title">
                        <a
                          class="collapsed"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="true"
                          aria-controls="collapseThree"
                        >
                          Credit Card
                        </a>
                      </h5>
                    </div>
                    <div id="collapseThree" class="collapse show" data-parent="#accordion">
                      <div class="card-body">
                        <form action="#">
                          <div class="checkbox-form">
                            <div class="row">
                              <div class="col-md-6">
                                <div class="checkout-form-list">
                                  <label>Card Number<span class="required">*</span></label>
                                  <input placeholder="6743-74..." type="text" v-model="cardNumber" />
                                </div>
                                <div class="checkout-form-list">
                                  <label>Card Name<span class="required">*</span></label>
                                  <input placeholder="" type="text" v-model="cardName" />
                                </div>
                                <div class="checkout-form-list">
                                  <label>Card Expiration Date <span class="required">*</span></label>
                                  <input placeholder="MM/YY" type="text" v-model="cardExpirationDate" />
                                </div>
                                <div class="checkout-form-list">
                                  <label>Card CVV<span class="required">*</span></label>
                                  <input placeholder="" type="text" v-model="cardCvv" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order-button-payment">
                  <input value="Place order" type="submit" @click="handlePlaceOrder" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="cartStore.items.length === 0" class="checkout-area pt-60 pb-30">
    <div class="container">
      You can't checkout with an empty cart. Please add some products first.
    </div>
  </div>
  <!--Checkout Area End-->
</template>
