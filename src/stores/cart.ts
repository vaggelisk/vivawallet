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

  const totalMoney = computed({
        get() {
          if (discount.value=='ILIKEAPPLE') {
            return items.value.reduce((accumulator, item) => {  // avto to hash einai to id tou mhlou opy erxetai apo to server
              return item.product.id=="d65d349b-2a77-4fdb-9d7a-0ab85eb84fd1"
                  ? accumulator +item.product.price * item.quantity * 0.40
                  : accumulator +item.product.price * item.quantity;
            }, 0).toFixed(2);
          } else if (discount.value=='ILIKEPEAR') {
            return items.value.reduce((accumulator, item) => {  // avto to hash einai to id tou achladioy
              return item.product.id=="34d69140-d883-48d5-9af6-cecae5e653e2"
                  ? accumulator +item.product.price * item.quantity * 0.60
                  : accumulator +item.product.price * item.quantity;
            }, 0).toFixed(2);
          } else if (discount.value=='GREEN') {
            return items.value.reduce((accumulator, item) => {  // achladi kai avocado
              return item.product.id=="34d69140-d883-48d5-9af6-cecae5e653e2" || item.product.id=="51405659-f333-4f68-871d-fe0fc4706678"
                  ? accumulator +item.product.price * item.quantity * 0.70
                  : accumulator +item.product.price * item.quantity;
            }, 0).toFixed(2);
          } else if (discount.value=='SUMMER') {  // 2 evrw h 200 cent einai h synolikh ekptwsh se avthn thn periptwsh
            if ( items.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0) > 2 ) {  // den ginetai na parei avto to voucher gia poso mikrotero totalAmmount mikrotero twn 2 evrw
              return (items.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0) - 2).toFixed(2)
            } else {
              return items.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)
            }
          } else if (discount.value=='HAPPYBIRTHDAY') {  // -20% h ekptwsh dhl 80% ths arxikhs timhs
            return (items.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0) * 0.8).toFixed(2)
          }
          else {
            return items.value.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)
          }
        },
        set() {
          //
        }
      }
  )
  function getVoucher(v) {
    discount.value = v
  }
  function removeVoucher() {
    discount.value = ''
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

  return { items, totalMoney, addToCart, removeItem, clearCart, getVoucher, removeVoucher }
})
