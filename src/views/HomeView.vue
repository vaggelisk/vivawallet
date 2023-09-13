<script setup lang="ts">
import HorizontalProductCard from '@/components/HorizontalProductCard.vue'
import VerticalProductCard from '@/components/VerticalProductCard.vue'
import type { Ref } from 'vue'
import { onMounted, ref, watch } from 'vue'

type Product = {
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

const sortType = ref('asc')
const data = ref<Product[]>([])
const loading: Ref<boolean> = ref(true)
const error = ref(null)

const offset = ref(0)
const limit = ref(10)
const total = ref(0)
const currentPage = ref(1)
const totalPages = ref(0)
const paginateData = ref<Product[]>([])

function fetchData() {
  loading.value = true

  return fetch('https://demo0336234.mockable.io/products', {
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
      data.value = json.products
    })
    .catch((err) => {
      error.value = err
    })
    .finally(() => {
      data.value.forEach(p => p.price = p.price/100)
      loading.value = false
    })
}

watch(data, () => {
  total.value = data.value.length
  data.value.forEach(p => {
    p.image = p.name.substring(3)
  })
  totalPages.value = Math.ceil(1)
  offset.value = 0
  paginateData.value = data.value.slice(0, 10)
})

watch(currentPage, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    offset.value = (currentPage.value - 1) * limit.value
    paginateData.value = data.value.slice(0, 10)
  }
})

watch(sortType, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    data.value = [
      ...data.value.sort((a, b) => {
        if (newVal === 'asc') {
          return a.price - b.price
        } else {
          return b.price - a.price
        }
      })
    ]
  }
})

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function goToPage(page: number) {
  currentPage.value = page
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <!-- Begin Vangelis' Content Wraper Area -->
  <div class="content-wraper pt-60 pb-60">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <!-- shop-top-bar start -->
          <div class="shop-top-bar mt-30" v-if="!loading && data && data.length > 0">
            <div class="shop-bar-inner">
              <div class="product-view-mode">
                <!-- shop-item-filter-list start -->
                <ul class="nav shop-item-filter-list" role="tablist">
                  <li class="active" role="presentation">
                    <a
                      aria-selected="true"
                      class="active show"
                      data-toggle="tab"
                      role="tab"
                      aria-controls="grid-view"
                      href="#grid-view"
                      ><i class="fa fa-th"></i
                    ></a>
                  </li>
                  <li role="presentation">
                    <a data-toggle="tab" role="tab" aria-controls="list-view" href="#list-view"
                      ><i class="fa fa-th-list"></i
                    ></a>
                  </li>
                </ul>
                <!-- shop-item-filter-list end -->
              </div>
              <div class="toolbar-amount">
                <span
                  >Showing {{ offset + 1 }} to
                  {{ offset + limit > total ? total : offset + limit }} of {{ total }}</span
                >
              </div>
            </div>
            <!-- product-select-box start -->
            <div class="product-select-box">
              <div class="product-short">
                <p>Sort By:</p>
                <select class="nice-select" v-model="sortType">
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
            <!-- product-select-box end -->
          </div>
          <!-- shop-top-bar end -->
          <!-- shop-products-wrapper start -->
          <div class="shop-products-wrapper" v-if="!loading && data && data.length > 0">
            <div class="tab-content">
              <div id="grid-view" class="tab-pane fade active show" role="tabpanel">
                <div class="product-area shop-product-area">
                  <div class="row">
                    <VerticalProductCard
                      v-for="product in paginateData"
                      :key="product.id"
                      :product="product"
                    />
                  </div>
                </div>
              </div>
              <div id="list-view" class="tab-pane product-list-view fade" role="tabpanel">
                <div class="row">
                  <div class="col">
                    <HorizontalProductCard
                      v-for="product in paginateData"
                      :key="product.id"
                      :product="product"
                    />
                  </div>
                </div>
              </div>
              <div class="paginatoin-area">
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                    <p>
                      Showing {{ offset + 1 }}-{{
                        offset + limit > total ? total : offset + limit
                      }}
                      {{ total }} item(s)
                    </p>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <ul class="pagination-box">
                      <li @click="prevPage">
                        <a class="Previous" :style="{ cursor: 'pointer' }"
                          ><i class="fa fa-chevron-left"></i> Previous</a
                        >
                      </li>
                      <li
                        v-for="index in totalPages"
                        :key="index"
                        :class="{
                          active: index === currentPage
                        }"
                      >
                        <a @click="() => goToPage(index)" :style="{ cursor: 'pointer' }">{{
                          index
                        }}</a>
                      </li>
                      <li @click="nextPage">
                        <a class="Next" :style="{ cursor: 'pointer' }">
                          Next <i class="fa fa-chevron-right"></i
                        ></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- shop-products-wrapper end -->
          <p v-if="loading">Loading..</p>
          <p v-if="error">Error</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Content Wraper Area End Here -->
</template>
