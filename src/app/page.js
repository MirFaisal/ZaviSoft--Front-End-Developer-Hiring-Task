"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Header, Footer, Cart, Banner, NewDrops, CategoriesSection, Reviews } from "@/components";
import { initializeCart } from "@/store";

export default function Home() {
  const dispatch = useDispatch();

  // Initialize cart from localStorage on mount
  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col max-w-360 mx-auto">
      <Header />
      <Cart />

      <main className="flex-1 mt-6 lg:mt-10 flex flex-col gap-12 lg:gap-20">
        {/* Banner Section */}
        <Banner />

        {/* New Drops Section */}
        <NewDrops />

        {/* Categories Section – full-width dark bg */}
        <CategoriesSection />

        {/* Reviews Section */}
        <Reviews />
      </main>

      {/* Footer */}
      <div className="mt-12 lg:mt-20">
        <Footer />
      </div>
    </div>
  );
}
