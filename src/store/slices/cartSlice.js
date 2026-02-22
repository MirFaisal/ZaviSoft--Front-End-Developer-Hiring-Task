import { createSlice } from "@reduxjs/toolkit";

// Helper function to load cart from localStorage
const loadCartFromStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  }
  return [];
};

// Helper function to save cart to localStorage
export const saveCartToStorage = (items) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch {
      // Handle storage errors silently
    }
  }
};

const initialState = {
  items: [],
  isCartOpen: false,
  lastAddedItem: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Initialize cart from localStorage (call on app mount)
    initializeCart: (state) => {
      state.items = loadCartFromStorage();
    },

    // Add item to cart
    addToCart: (state, action) => {
      const { id, title, price, image, description, quantity = 1, size = null } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        if (size !== null) existingItem.size = size;
      } else {
        state.items.push({
          id,
          title,
          price,
          image,
          description,
          quantity,
          size,
        });
      }
      state.lastAddedItem = { id, title, price, image };
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Increment item quantity
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // Decrement item quantity
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },

    // Update size of an item
    updateSize: (state, action) => {
      const { id, size } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.size = size;
      }
    },

    // Set quantity directly
    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        if (quantity < 1) {
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.quantity = quantity;
        }
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
    },

    // Toggle cart sidebar
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    // Close cart
    closeCart: (state) => {
      state.isCartOpen = false;
    },

    // Clear last added notification
    clearLastAdded: (state) => {
      state.lastAddedItem = null;
    },
  },
});

// Export actions
export const {
  initializeCart,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateSize,
  setQuantity,
  clearCart,
  toggleCart,
  closeCart,
  clearLastAdded,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectIsCartOpen = (state) => state.cart.isCartOpen;
export const selectLastAddedItem = (state) => state.cart.lastAddedItem;

export default cartSlice.reducer;
