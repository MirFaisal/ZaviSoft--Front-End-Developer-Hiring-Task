// Custom hooks for reusable logic
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  selectCartItemById,
} from "@/store";

/**
 * Custom hook for cart operations
 */
export function useCart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  const add = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images?.[0] || "",
        quantity: 1,
      })
    );
  };

  const remove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const update = (productId, quantity) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const getItem = (productId) => {
    return items.find((item) => item.id === productId);
  };

  return {
    items,
    total,
    itemCount,
    add,
    remove,
    update,
    getItem,
  };
}

/**
 * Hook to check if a product is in cart
 */
export function useIsInCart(productId) {
  const item = useSelector(selectCartItemById(productId));
  return !!item;
}
