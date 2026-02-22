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
  incrementQuantity,
  decrementQuantity,
  updateSize,
  setQuantity,
  toggleCart,
  closeCart,
  clearLastAdded,
  selectCartItems,
  selectCartItemCount,
  selectCartTotal,
  selectIsCartOpen,
  selectLastAddedItem,
} from "./slices/cartSlice";
