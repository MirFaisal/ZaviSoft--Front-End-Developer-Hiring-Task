// Store exports
export { store } from "./store";

// API exports
export {
  apiSlice,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
  useGetRelatedProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useSearchProductsQuery,
  useFilterProductsByPriceQuery,
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
  openCart,
  closeCart,
  selectCartItems,
  selectCartItemCount,
  selectCartTotal,
  selectIsCartOpen,
  selectCartItemById,
} from "./slices/cartSlice";
