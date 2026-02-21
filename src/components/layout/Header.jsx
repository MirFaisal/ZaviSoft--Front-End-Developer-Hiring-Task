"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemCount, toggleCart } from "@/store";

export default function Header() {
  const dispatch = useDispatch();
  const cartItemCount = useSelector(selectCartItemCount);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-kicks-card rounded-3xl mx-4 lg:mx-10 xl:mx-15 mt-8">
      <div className="flex items-center justify-between p-4 lg:p-8">
        {/* Left Navigation */}
        <nav className="hidden lg:flex items-start gap-10 w-82.75 font-rubik font-semibold text-base text-kicks-dark">
          <Link href="/products" className="flex items-center gap-0 hover:opacity-70 transition-opacity">
            <span className="ml-1">New Drops</span>
            <span>🔥</span>
          </Link>
          <Link href="/categories" className="flex items-center gap-0.5 hover:opacity-70 transition-opacity">
            <span>Men</span>
            <Image src="/icons/caret-down.svg" alt="" width={8} height={5} />
          </Link>
          <Link href="/categories" className="flex items-center gap-0.5 hover:opacity-70 transition-opacity">
            <span>Women</span>
            <Image src="/icons/caret-down.svg" alt="" width={8} height={5} />
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 text-kicks-dark"
          aria-label="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Image
            src={mobileMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
            alt={mobileMenuOpen ? "Close menu" : "Open menu"}
            width={24}
            height={24}
          />
        </button>

        {/* Center Logo */}
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/images/logo.svg"
            alt="KICKS"
            width={128}
            height={32}
            className="h-6 lg:h-8 w-auto"
            priority
          />
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2 lg:gap-10 justify-end w-auto lg:w-75.25">
          {/* Search */}
          <button
            type="button"
            className="text-kicks-dark hover:opacity-70 transition-opacity hidden sm:block"
            aria-label="Search">
            <Image src="/icons/search.svg" alt="Search" width={24} height={24} />
          </button>

          {/* User */}
          <button
            type="button"
            className="text-kicks-dark hover:opacity-70 transition-opacity"
            aria-label="User account">
            <Image
              src="/icons/user.svg"
              alt="User account"
              width={24}
              height={24}
              className="w-4 h-4 lg:w-6 lg:h-6"
            />
          </button>

          {/* Cart Badge */}
          <button
            type="button"
            onClick={() => dispatch(toggleCart())}
            className="bg-kicks-yellow rounded-full w-5 h-5 p-2.5 lg:w-8 lg:h-8 flex items-center justify-center font-open-sans font-semibold text-sm lg:text-base text-kicks-dark hover:opacity-80 transition-opacity shrink-0"
            aria-label="Cart">
            {cartItemCount}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-gray-200 px-4 py-4 font-rubik font-semibold text-base text-kicks-dark">
          <div className="flex flex-col gap-4">
            <Link
              href="/products"
              className="flex items-center gap-1 hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}>
              <span>New Drops</span>
              <span>🔥</span>
            </Link>
            <Link
              href="/categories"
              className="flex items-center gap-0.5 hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}>
              <span>Men</span>
              <Image src="/icons/caret-down.svg" alt="" width={8} height={5} />
            </Link>
            <Link
              href="/categories"
              className="flex items-center gap-0.5 hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}>
              <span>Women</span>
              <Image src="/icons/caret-down.svg" alt="" width={8} height={5} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
