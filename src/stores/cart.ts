import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

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

type Item = {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<Item[]>([])
  const discount = ref( '')

  const totalMoney = computed(() =>
      items.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)
  )

  function getVoucher(v) {
    discount.value = v
  }

  function addToCart(product: Product, quantity: number) {
    const item = items.value.find((item) => item.product.id === product.id)
    items.value.push({ product, quantity })
  }
  function removeItem(product: Product) {
    const index = items.value.findIndex((item) => item.product.id === product.id)
    items.value.splice(index, 1)
  }
  function clearCart() {
    items.value = []
  }


  return { items, totalMoney, addToCart, removeItem, clearCart, getVoucher }
})
