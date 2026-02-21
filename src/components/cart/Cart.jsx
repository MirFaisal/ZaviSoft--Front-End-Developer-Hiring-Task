"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const isOpen = useSelector(selectIsCartOpen);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={() => dispatch(closeCart())}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-[slideIn_0.3s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-kicks-bg">
          <h2 className="font-rubik font-semibold text-xl text-kicks-dark uppercase">
            Your Bag
          </h2>
          <span className="font-open-sans text-sm text-kicks-dark/60">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
          <button
            onClick={() => dispatch(closeCart())}
            className="size-10 flex items-center justify-center rounded-lg bg-kicks-bg hover:bg-kicks-disabled transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <Image src="/icons/close.svg" alt="Close" width={20} height={20} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="size-24 rounded-full bg-kicks-card flex items-center justify-center">
                <Image src="/icons/cart-empty.svg" alt="Empty cart" width={48} height={48} />
              </div>
              <div className="text-center">
                <p className="font-rubik font-semibold text-lg text-kicks-dark">Your bag is empty</p>
                <p className="font-open-sans text-sm text-kicks-dark/60 mt-1">
                  Looks like you haven&apos;t added anything yet
                </p>
              </div>
              <button
                onClick={() => dispatch(closeCart())}
                className="mt-2 h-12 px-8 bg-kicks-blue text-white rounded-lg font-rubik font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-colors cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 bg-kicks-card rounded-2xl p-3"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-kicks-bg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-top"
                      unoptimized
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div>
                      <h3 className="font-rubik font-semibold text-sm text-kicks-dark line-clamp-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="font-rubik font-semibold text-base text-kicks-blue mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-white rounded-lg border border-kicks-bg">
                        <button
                          onClick={() => dispatch(decrementQuantity(item.id))}
                          className="w-8 h-8 flex items-center justify-center rounded-l-lg hover:bg-kicks-bg transition-colors font-rubik font-medium text-kicks-dark cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-rubik font-semibold text-sm text-kicks-dark">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(incrementQuantity(item.id))}
                          className="w-8 h-8 flex items-center justify-center rounded-r-lg hover:bg-kicks-bg transition-colors font-rubik font-medium text-kicks-dark cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="size-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors cursor-pointer group"
                        aria-label="Remove item"
                      >
                        <Image src="/icons/trash.svg" alt="Remove" width={18} height={18} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-kicks-bg px-6 py-5 space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-open-sans text-sm text-kicks-dark/60">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-open-sans text-sm text-kicks-dark/60">
                <span>Shipping</span>
                <span className="text-kicks-blue font-semibold">Free</span>
              </div>
              <div className="h-px bg-kicks-bg my-1" />
              <div className="flex justify-between">
                <span className="font-rubik font-semibold text-lg text-kicks-dark">Total</span>
                <span className="font-rubik font-semibold text-lg text-kicks-yellow">${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => {
                dispatch(closeCart());
                router.push("/cart");
              }}
              className="w-full h-12 bg-kicks-dark text-white rounded-lg font-rubik font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-colors cursor-pointer">
              View Cart
            </button>
            <button className="w-full h-12 bg-kicks-dark text-white rounded-lg font-rubik font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-colors cursor-pointer">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
