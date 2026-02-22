// Store exports
export { store } from "./store";

// API exports
export {
  apiSlice,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} from "./api/apiSlice";

// Cart slice exports
export {
  initializeCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  toggleCart,
  closeCart,
  selectCartItems,
  selectCartItemCount,
  selectCartTotal,
  selectIsCartOpen,
} from "./slices/cartSlice";
