"use client";

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  closeCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "@/store";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(selectIsCartOpen);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => dispatch(closeCart())}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button
            onClick={() => dispatch(closeCart())}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <Image src="/icons/close.svg" alt="Close" width={24} height={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <Image src="/icons/cart-empty.svg" alt="Empty cart" width={64} height={64} className="mx-auto" />
              <p className="mt-4 text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 bg-gray-50 rounded-lg p-3"
                >
                  {/* Product Image */}
                  <div className="relative w-20 h-20 rounded-md overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-indigo-600 font-semibold">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => dispatch(decrementQuantity(item.id))}
                        className="w-8 h-8 flex items-center justify-center bg-white border rounded-md hover:bg-gray-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(incrementQuantity(item.id))}
                        className="w-8 h-8 flex items-center justify-center bg-white border rounded-md hover:bg-gray-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="p-1 opacity-60 hover:opacity-100 transition-opacity"
                    aria-label="Remove item"
                  >
                    <Image src="/icons/trash.svg" alt="Remove" width={20} height={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
