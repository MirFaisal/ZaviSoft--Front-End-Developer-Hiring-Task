"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Spinner, ImageSlider } from "@/components/ui";
import { YouMayAlsoLike } from "@/components/products";
import { useGetProductByIdQuery, useGetProductsByCategoryQuery, addToCart } from "@/store";
import { getValidImageUrl, getValidImages } from "@/lib/utils";

const PLACEHOLDER = "https://placehold.co/600x600/e2e8f0/475569?text=Product";
const ALL_SIZES = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
const DISABLED_SIZES = new Set([39, 40]);
const COLORS = [
  { name: "Dark Navy", value: "#232321" },
  { name: "Olive Green", value: "#7D8471" },
];

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(38);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  const { data: categoryProducts } = useGetProductsByCategoryQuery(
    { categoryId: product?.category?.id, offset: 0, limit: 20 },
    { skip: !product?.category?.id },
  );

  // Related products = same category, excluding current product
  const relatedProducts = (categoryProducts || []).filter((p) => p.id !== Number(id)).slice(0, 16);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: getValidImageUrl(product.images?.[0], PLACEHOLDER),
        quantity: 1,
      }),
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <Spinner size="lg" />
        </main>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-rubik font-semibold text-2xl text-[#232321] mb-4">Product Not Found</h1>
            <p className="text-[#232321]/60 mb-6">
              The product you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/products"
              className="inline-block bg-[#232321] text-white px-6 py-3 rounded-lg hover:bg-[#1a1a18] transition-colors font-rubik font-medium text-sm uppercase tracking-wider">
              Browse Products
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const imgs = getValidImages(product.images, 4, PLACEHOLDER);

  return (
    <div className="min-h-screen flex flex-col bg-[#e7e7e3]">
      <main className="flex-1">
        {/* ─── Product Section ─── */}
        <section className="max-w-[1440px] mx-auto px-4 lg:px-[60px] pt-6 lg:pt-8 pb-12 lg:pb-20">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* ─── Images ─── */}
            <div className="w-full lg:w-[80%]">
              {/* Mobile: Hero image + thumbnails */}
              <ImageSlider images={imgs} alt={product.title} className="lg:hidden" />

              {/* Desktop: 2×2 Grid */}
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <div className="relative aspect-[429/510] rounded-tl-[48px] overflow-hidden bg-[#fafafa]">
                  <Image
                    src={imgs[0]}
                    alt={`${product.title} - 1`}
                    fill
                    className="object-cover object-top"
                    sizes="30vw"
                    priority
                    unoptimized
                  />
                </div>
                <div className="relative aspect-[429/510] rounded-tr-[48px] overflow-hidden bg-[#fafafa]">
                  <Image
                    src={imgs[1]}
                    alt={`${product.title} - 2`}
                    fill
                    className="object-cover object-top"
                    sizes="30vw"
                    unoptimized
                  />
                </div>
                <div className="relative aspect-[429/510] rounded-bl-[48px] overflow-hidden bg-[#fafafa]">
                  <Image
                    src={imgs[2]}
                    alt={`${product.title} - 3`}
                    fill
                    className="object-cover object-top"
                    sizes="30vw"
                    unoptimized
                  />
                </div>
                <div className="relative aspect-[429/510] rounded-br-[48px] overflow-hidden bg-[#fafafa]">
                  <Image
                    src={imgs[3]}
                    alt={`${product.title} - 4`}
                    fill
                    className="object-cover object-top"
                    sizes="30vw"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* ─── Product Info ─── */}
            <div className="w-full lg:w-[40%] flex flex-col gap-8">
              {/* Badge + Title + Price */}
              <div className="flex flex-col gap-4">
                <span className="self-start bg-[#4a69e2] text-white font-rubik font-semibold text-xs px-4 py-2 rounded-lg">
                  New Release
                </span>
                <h1 className="font-rubik font-semibold text-xl lg:text-[32px] text-[#232321] uppercase leading-tight">
                  {product.title}
                </h1>
                <p className="font-rubik font-semibold text-2xl text-[#4a69e2]">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              {/* Color */}
              <div className="flex flex-col gap-2">
                <p className="font-rubik font-semibold text-base text-[#232321] uppercase">Color</p>
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
                            isSelected ? "size-8 ring-[3px] ring-[#232321] ring-offset-[3px]" : "size-8"
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
                  <p className="font-rubik font-semibold text-base text-[#232321] uppercase">Size</p>
                  <button className="font-rubik font-medium text-sm text-[#232321] uppercase tracking-wider underline underline-offset-2">
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
                            ? "bg-[#232321] text-white"
                            : isDisabled
                              ? "bg-[#d2d1d3] text-[#8f8c91] cursor-not-allowed"
                              : "bg-white text-[#232321] hover:bg-gray-100 cursor-pointer"
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
                    className="flex-1 h-12 bg-[#232321] text-white rounded-lg font-rubik font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-colors cursor-pointer">
                    Add to cart
                  </button>
                  <button className="h-12 px-4 bg-[#232321] rounded-lg flex items-center justify-center hover:opacity-90 transition-colors cursor-pointer">
                    <Image src="/icons/heart.svg" alt="Wishlist" width={24} height={24} />
                  </button>
                </div>
                <button className="w-full h-12 bg-[#4a69e2] text-white rounded-lg font-rubik font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-colors cursor-pointer">
                  Buy it now
                </button>
              </div>

              {/* About the product */}
              <div className="flex flex-col gap-2 text-[#232321]">
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
          </div>
        </section>

        {/* ─── You may also like ─── */}
        <YouMayAlsoLike
          products={relatedProducts}
          className="max-w-[1440px] mx-auto px-4 lg:px-[60px] pb-12 lg:pb-20"
        />
      </main>
    </div>
  );
}
