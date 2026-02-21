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
const saveCartToStorage = (cart) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {
      // Handle storage errors silently
    }
  }
};

const initialState = {
  items: [],
  isCartOpen: false,
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
      const { id, title, price, image, description, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          title,
          price,
          image,
          description,
          quantity,
        });
      }
      saveCartToStorage(state.items);
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToStorage(state.items);
    },

    // Update item quantity
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          item.quantity = quantity;
        }
        saveCartToStorage(state.items);
      }
    },

    // Increment item quantity
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCartToStorage(state.items);
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
        saveCartToStorage(state.items);
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },

    // Toggle cart sidebar
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },

    // Open cart
    openCart: (state) => {
      state.isCartOpen = true;
    },

    // Close cart
    closeCart: (state) => {
      state.isCartOpen = false;
    },
  },
});

// Export actions
export const {
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
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectIsCartOpen = (state) => state.cart.isCartOpen;
export const selectCartItemById = (id) => (state) => state.cart.items.find((item) => item.id === id);

export default cartSlice.reducer;
