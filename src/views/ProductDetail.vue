<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

const loading = ref(true)
const product = ref<Product | null>(null)
const error = ref(null)
const cartStore = useCartStore()

function fetchData() {
  loading.value = true

  return fetch(`https://fakestoreapi.com/products/${useRoute().params.id}`, {
    method: 'get',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then((res) => {
      // a non-200 response code
      if (!res.ok) {
        // create error instance with HTTP status text
        const error = new Error(res.statusText)
        throw error
      }

      return res.json()
    })
    .then((json) => {
      // set the response data
      product.value = json
    })
    .catch((err) => {
      error.value = err
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div v-if="!loading && product !== null">
    <!-- Begin Vangelis' Breadcrumb Area -->
    <div class="breadcrumb-area">
      <div class="container">
        <div class="breadcrumb-content">
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li class="active">{{ product.title }}</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Vangelis' Breadcrumb Area End Here -->
    <!-- content-wraper start -->
    <div class="content-wraper">
      <div class="container">
        <div class="row single-product-area">
          <div class="col-lg-5 col-md-6">
            <!-- Product Details Left -->
            <div class="product-details-left">
              <div class="product-details-images slider-navigation-1">
                <div
                  class="lg-image"
                  :style="{
                    width: '90%',
                    padding: '10%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }"
                >
                  <a
                    class="popup-img venobox vbox-item"
                    :href="product.image"
                    data-gall="myGallery"
                  >
                    <img class="img-fluid" :src="product.image" :alt="product.title" />
                  </a>
                </div>
              </div>
              <div class="product-details-thumbs slider-thumbs-1">
                <div class="sm-image" :style="{ width: '20%' }">
                  <img class="img-fluid" :src="product.image" :alt="product.title" />
                </div>
              </div>
            </div>
            <!--// Product Details Left -->
          </div>

          <div class="col-lg-7 col-md-6">
            <div class="product-details-view-content pt-60">
              <div class="product-info">
                <h2>{{ product.title }}</h2>
                <span class="product-details-ref">Reference: demo_15</span>
                <div class="rating-box pt-20">
                  <ul class="rating rating-with-review-item">
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li class="no-star"><i class="fa fa-star-o"></i></li>
                    <li class="no-star"><i class="fa fa-star-o"></i></li>
                    <li class="review-item"><a href="#">Read Review</a></li>
                    <li class="review-item"><a href="#">Write Review</a></li>
                  </ul>
                </div>
                <div class="price-box pt-20">
                  <span class="new-price new-price-2">${{ product.price }}</span>
                </div>
                <div class="product-desc">
                  <p>
                    <span>{{ product.description }}</span>
                  </p>
                </div>
                <div class="single-add-to-cart">
                  <div class="cart-quantity">
                    <button
                      class="add-to-cart"
                      @click="() => cartStore.addToCart(product as Product, 1)"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
                <div class="product-additional-info pt-25">
                  <a class="wishlist-btn" href="#"><i class="fa fa-heart-o"></i>Add to wishlist</a>
                  <div class="product-social-sharing pt-25">
                    <ul>
                      <li class="facebook">
                        <a href="#"><i class="fa fa-facebook"></i>Facebook</a>
                      </li>
                      <li class="twitter">
                        <a href="#"><i class="fa fa-twitter"></i>Twitter</a>
                      </li>
                      <li class="google-plus">
                        <a href="#"><i class="fa fa-google-plus"></i>Google +</a>
                      </li>
                      <li class="instagram">
                        <a href="#"><i class="fa fa-instagram"></i>Instagram</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="block-reassurance">
                  <ul>
                    <li>
                      <div class="reassurance-item">
                        <div class="reassurance-icon">
                          <i class="fa fa-check-square-o"></i>
                        </div>
                        <p>Security policy (edit with Customer reassurance module)</p>
                      </div>
                    </li>
                    <li>
                      <div class="reassurance-item">
                        <div class="reassurance-icon">
                          <i class="fa fa-truck"></i>
                        </div>
                        <p>Delivery policy (edit with Customer reassurance module)</p>
                      </div>
                    </li>
                    <li>
                      <div class="reassurance-item">
                        <div class="reassurance-icon">
                          <i class="fa fa-exchange"></i>
                        </div>
                        <p>Return policy (edit with Customer reassurance module)</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- content-wraper end -->
    <!-- Begin Product Area -->
    <div class="product-area pt-35">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="li-product-tab">
              <ul class="nav li-product-menu">
                <li>
                  <a class="active" data-toggle="tab" href="#description"
                    ><span>Description</span></a
                  >
                </li>
                <li>
                  <a data-toggle="tab" href="#product-details"><span>Product Details</span></a>
                </li>
                <li>
                  <a data-toggle="tab" href="#reviews"><span>Reviews</span></a>
                </li>
              </ul>
            </div>
            <!-- Begin Vangelis' Tab Menu Content Area -->
          </div>
        </div>
        <div class="tab-content">
          <div id="description" class="tab-pane active show" role="tabpanel">
            <div class="product-description">
              <span>{{ product.description }}</span>
            </div>
          </div>
          <div id="product-details" class="tab-pane" role="tabpanel">
            <div class="product-details-manufacturer">
              <a
                href="#"
                :style="{
                  width: '300px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }"
              >
                <img class="img-fluid" :src="product.image" :alt="product.title" />
              </a>
              <p><span>Reference</span> demo_7</p>
              <p><span>Reference</span> demo_7</p>
            </div>
          </div>
          <div id="reviews" class="tab-pane" role="tabpanel">
            <div class="product-reviews">
              <div class="product-details-comment-block">
                <div class="comment-review">
                  <span>Grade</span>
                  <ul class="rating">
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li><i class="fa fa-star-o"></i></li>
                    <li class="no-star"><i class="fa fa-star-o"></i></li>
                    <li class="no-star"><i class="fa fa-star-o"></i></li>
                  </ul>
                </div>
                <div class="comment-author-infos pt-25">
                  <span>HTML 5</span>
                  <em>01-12-18</em>
                </div>
                <div class="comment-details">
                  <h4 class="title-block">Demo</h4>
                  <p>Plaza</p>
                </div>
                <div class="review-btn">
                  <a class="review-links" href="#" data-toggle="modal" data-target="#mymodal"
                    >Write Your Review!</a
                  >
                </div>
                <!-- Begin Quick View | Modal Area -->
                <div class="modal fade modal-wrapper" id="mymodal">
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-body">
                        <h3 class="review-page-title">Write Your Review</h3>
                        <div class="modal-inner-area row">
                          <div class="col-lg-6">
                            <div class="li-review-product">
                              <img class="img-fluid" :src="product.image" :alt="product.title" />
                              <div class="li-review-product-desc">
                                <p class="li-product-name">{{ product.title }}</p>
                                <p>
                                  <span>{{ product.description }} </span>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-6">
                            <div class="li-review-content">
                              <!-- Begin Feedback Area -->
                              <div class="feedback-area">
                                <div class="feedback">
                                  <h3 class="feedback-title">Our Feedback</h3>
                                  <form action="#">
                                    <p class="your-opinion">
                                      <label>Your Rating</label>
                                      <span>
                                        <select class="star-rating">
                                          <option value="1">1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                          <option value="5">5</option>
                                        </select>
                                      </span>
                                    </p>
                                    <p class="feedback-form">
                                      <label for="feedback">Your Review</label>
                                      <textarea
                                        id="feedback"
                                        name="comment"
                                        cols="45"
                                        rows="8"
                                        aria-required="true"
                                      ></textarea>
                                    </p>
                                    <div class="feedback-input">
                                      <p class="feedback-form-author">
                                        <label for="author"
                                          >Name<span class="required">*</span>
                                        </label>
                                        <input
                                          id="author"
                                          name="author"
                                          value=""
                                          size="30"
                                          aria-required="true"
                                          type="text"
                                        />
                                      </p>
                                      <p class="feedback-form-author feedback-form-email">
                                        <label for="email"
                                          >Email<span class="required">*</span>
                                        </label>
                                        <input
                                          id="email"
                                          name="email"
                                          value=""
                                          size="30"
                                          aria-required="true"
                                          type="text"
                                        />
                                        <span class="required"><sub>*</sub> Required fields</span>
                                      </p>
                                      <div class="feedback-btn pb-15">
                                        <a
                                          href="#"
                                          class="close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                          >Close</a
                                        >
                                        <a href="#">Submit</a>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              <!-- Feedback Area End Here -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Quick View | Modal Area End Here -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Product Area End Here -->
  </div>
  <div class="content-wraper" v-if="loading">
    <div class="container">Loading ...</div>
  </div>
  <div class="content-wraper" v-if="error">
    <div class="container">Error</div>
  </div>
</template>
