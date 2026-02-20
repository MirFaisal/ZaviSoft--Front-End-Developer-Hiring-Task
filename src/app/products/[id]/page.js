"use client";

import { use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Header, Footer, Cart, ProductCard, Spinner } from "@/components";
import { useGetProductByIdQuery, useGetRelatedProductsQuery, addToCart, initializeCart } from "@/store";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const dispatch = useDispatch();

  // Initialize cart from localStorage
  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  const { data: relatedProducts } = useGetRelatedProductsQuery(id, {
    skip: !product,
  });

  const handleAddToCart = () => {
    if (!product) return;

    const imageUrl = getValidImage(product.images);
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: imageUrl,
        quantity: 1,
      }),
    );
  };

  // Helper to get valid image URL
  const getValidImage = (images) => {
    if (!images || images.length === 0) {
      return "https://placehold.co/600x600/e2e8f0/475569?text=Product";
    }
    const img = images[0];
    if (img.includes("[") || img.includes("any") || !img.startsWith("http")) {
      return "https://placehold.co/600x600/e2e8f0/475569?text=Product";
    }
    return img;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <Cart />
        <main className="flex-1 flex items-center justify-center">
          <Spinner size="lg" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <Cart />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-6">
              The product you&apos;re looking for doesn&apos;t exist or has been removed.
            </p>
            <Link
              href="/products"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors">
              Browse Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const mainImage = getValidImage(product.images);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Cart />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gray-50 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-gray-500 hover:text-indigo-600">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link href="/products" className="text-gray-500 hover:text-indigo-600">
                Products
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={mainImage}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>

                {/* Thumbnail Images */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.slice(0, 4).map((img, index) => {
                      const thumbUrl = getValidImage([img]);
                      return (
                        <div
                          key={index}
                          className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:ring-2 hover:ring-indigo-500">
                          <Image
                            src={thumbUrl}
                            alt={`${product.title} - Image ${index + 1}`}
                            fill
                            sizes="100px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Category */}
                {product.category && (
                  <Link
                    href={`/categories/${product.category.id}`}
                    className="inline-block text-sm text-indigo-600 font-medium hover:text-indigo-700">
                    {product.category.name}
                  </Link>
                )}

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product.title}</h1>

                {/* Price */}
                <p className="text-3xl font-bold text-indigo-600">${product.price.toFixed(2)}</p>

                {/* Description */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                    Add to Cart
                  </button>
                  <button className="flex-1 border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-indigo-50 transition-colors">
                    Buy Now
                  </button>
                </div>

                {/* Features */}
                <div className="border-t pt-6 mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-indigo-600">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-indigo-600">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">Easy Returns</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-indigo-600">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">Secure Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.slice(0, 4).map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
