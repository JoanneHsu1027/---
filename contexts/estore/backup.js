import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()
const storageKey = 'joannesshoppingcart'

// 定義初始空狀態
const emptyCart = []

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(emptyCart)

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.pk_product_id === product.pk_product_id,
      )
      if (existingItem) {
        const updatedItems = prevItems.map((item) =>
          item.pk_product_id === product.pk_product_id
            ? { ...item, qty: item.qty + 1 }
            : item,
        )
        localStorage.setItem(storageKey, JSON.stringify(updatedItems))
        return updatedItems
      }
      const newItems = [...prevItems, { ...product, qty: 1 }]
      localStorage.setItem(storageKey, JSON.stringify(newItems))
      return newItems
    })
  }

  const updateCartItemQuantity = (id, change) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems
        .map((item) =>
          item.pk_product_id === id
            ? { ...item, qty: Math.max(0, item.qty + change) }
            : item,
        )
        .filter((item) => item.qty > 0)
      localStorage.setItem(storageKey, JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  const removeCartItem = (id) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.pk_product_id !== id)
      localStorage.setItem(storageKey, JSON.stringify(updatedItems))
      return updatedItems
    })
  }

  // 當用戶重刷頁面時，從 localStorage 載入狀態
  useEffect(() => {
    const str = localStorage.getItem(storageKey)
    if (str) {
      try {
        const data = JSON.parse(str)
        if (Array.isArray(data)) {
          setCartItems(data)
        }
      } catch (error) {
        console.error('Failed to parse cart data:', error)
      }
    }
  }, [])

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateCartItemQuantity, removeCartItem }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
export default CartContext
