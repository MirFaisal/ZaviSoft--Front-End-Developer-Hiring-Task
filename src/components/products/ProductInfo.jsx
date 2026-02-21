"use client";

import { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store";
import { getValidImageUrl } from "@/lib/utils";

const PLACEHOLDER = "https://placehold.co/600x600/e2e8f0/475569?text=Product";
const ALL_SIZES = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
const DISABLED_SIZES = new Set([39, 40]);
const COLORS = [
  { name: "Dark Navy", value: "#232321" },
  { name: "Olive Green", value: "#7D8471" },
];

export default function ProductInfo({ product }) {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(ALL_SIZES[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: getValidImageUrl(product.images?.[0], PLACEHOLDER),
        description: product.description || "",
        quantity: 1,
      }),
    );
  };

  return (
    <div className="w-full lg:w-[40%] flex flex-col gap-8">
      {/* Badge + Title + Price */}
      <div className="flex flex-col gap-4">
        <span className="self-start bg-kicks-blue text-white font-rubik font-semibold text-xs px-4 py-2 rounded-lg">
          New Release
        </span>
        <h1 className="font-rubik font-semibold text-xl lg:text-[32px] text-kicks-dark uppercase leading-tight">
          {product.title}
        </h1>
        <p className="font-rubik font-semibold text-2xl text-kicks-blue">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {/* Color */}
      <div className="flex flex-col gap-2">
        <p className="font-rubik font-semibold text-base text-kicks-dark uppercase">Color</p>
        <div className="flex items-center gap-4">
          {COLORS.map((color) => {
            const isSelected = selectedColor === color.value;
            return (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                aria-label={color.name}
                className="size-12 rounded-full flex items-center justify-center cursor-pointer">
                <span
                  className={`block rounded-full transition-all duration-200 ${
                    isSelected ? "size-8 ring-[3px] ring-kicks-dark ring-offset-[3px]" : "size-8"
                  }`}
                  style={{ backgroundColor: color.value }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Size */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="font-rubik font-semibold text-base text-kicks-dark uppercase">Size</p>
          <button className="font-rubik font-medium text-sm text-kicks-dark uppercase tracking-wider underline underline-offset-2">
            Size chart
          </button>
        </div>
        <div className="grid grid-cols-6 lg:grid-cols-8 gap-2">
          {ALL_SIZES.map((size) => {
            const isDisabled = DISABLED_SIZES.has(size);
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                disabled={isDisabled}
                onClick={() => !isDisabled && setSelectedSize(size)}
                className={`h-12 flex items-center justify-center rounded-lg font-rubik font-medium text-sm uppercase tracking-wider transition-colors ${
                  isSelected
                    ? "bg-kicks-dark text-white"
                    : isDisabled
                      ? "bg-kicks-disabled text-kicks-muted cursor-not-allowed"
                      : "bg-white text-kicks-dark hover:bg-gray-100 cursor-pointer"
                }`}>
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 h-12 bg-kicks-dark text-white rounded-lg font-rubik font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-colors cursor-pointer">
            Add to cart
          </button>
          <button className="h-12 px-4 bg-kicks-dark rounded-lg flex items-center justify-center hover:opacity-90 transition-colors cursor-pointer">
            <Image src="/icons/heart.svg" alt="Wishlist" width={24} height={24} />
          </button>
        </div>
        <button className="w-full h-12 bg-kicks-blue text-white rounded-lg font-rubik font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-colors cursor-pointer">
          Buy it now
        </button>
      </div>

      {/* About the product */}
      <div className="flex flex-col gap-2 text-kicks-dark">
        <p className="font-rubik font-semibold text-base uppercase">About the product</p>
        <div className="font-inter text-base opacity-80 leading-relaxed">
          <p>{product.description}</p>
          <ul className="list-disc ml-6 mt-3 space-y-1">
            <li>Pay over time in interest-free installments with Affirm, Klarna or Afterpay.</li>
            <li>Join adiClub to get unlimited free standard shipping, returns, &amp; exchanges.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
