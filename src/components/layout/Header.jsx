"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemCount, toggleCart } from "@/store";

// Caret down icon for dropdown menus
function CaretDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="5" viewBox="0 0 8 5" fill="none">
      <path
        d="M0.563477 0.0234375H7.11621C7.57661 0.0234375 7.82492 0.563357 7.52539 0.913086L4.24902 4.73633C4.19847 4.79525 4.13596 4.84254 4.06543 4.875C3.99479 4.90748 3.91759 4.9248 3.83984 4.9248C3.76224 4.92475 3.68574 4.90741 3.61523 4.875C3.5446 4.84252 3.48127 4.79535 3.43066 4.73633L0.155273 0.913086L0.104492 0.845703C-0.113992 0.498212 0.131881 0.0234375 0.563477 0.0234375Z"
        fill="#232321"
        stroke="#232321"
        strokeWidth="0.046875"
      />
    </svg>
  );
}

// Search icon
function SearchIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
        stroke="#232321"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 21L16.65 16.65"
        stroke="#232321"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// User icon
function UserIcon({width = 16, height = 16}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 16" fill="none">
      <path
        d="M8 9.02344C9.49038 9.02344 10.9417 9.44425 12.0869 10.207C13.3756 11.0661 14.1954 12.2896 14.458 13.7461C14.5175 14.0752 14.4366 14.3997 14.2383 14.6367C14.1484 14.7445 14.0357 14.8309 13.9082 14.8896C13.7805 14.9484 13.6405 14.9784 13.5 14.9766H2.5L2.39453 14.9717C2.29041 14.9614 2.18829 14.9345 2.09277 14.8906C1.96512 14.8319 1.85177 14.7446 1.76172 14.6367C1.5637 14.3998 1.48362 14.0759 1.54297 13.7471C1.80553 12.2906 2.62441 11.0665 3.91309 10.207C5.05825 9.4439 6.5096 9.02347 8 9.02344ZM8 1.02344C8.93131 1.02344 9.77446 1.38265 10.3779 2.03418C10.9888 2.69377 11.2873 3.58184 11.2168 4.53516C11.0765 6.43571 9.63265 7.97656 8 7.97656C6.3674 7.97645 4.92128 6.43493 4.7832 4.53418C4.71374 3.57211 5.01019 2.68177 5.61719 2.02734C6.21773 1.38008 7.06374 1.02348 8 1.02344Z"
        fill="#232321"
        stroke="#232321"
        strokeWidth="0.046875"
      />
    </svg>
  );
}

export default function Header() {
  const dispatch = useDispatch();
  const cartItemCount = useSelector(selectCartItemCount);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fafafa] rounded-[24px] mx-[16px] lg:mx-[60px] mt-[32px]">
      <div className="flex items-center justify-between p-[16px] lg:p-[32px]">
        {/* Left Navigation */}
        <nav className="hidden lg:flex items-start gap-[40px] w-[331px] font-[family-name:var(--font-rubik)] font-semibold text-[16px] text-[#232321]">
          <Link href="/products" className="flex items-center gap-0 hover:opacity-70 transition-opacity">
            <span className="ml-1">New Drops</span>
            <span>🔥</span>
          </Link>
          <Link href="/categories" className="flex items-center gap-[2px] hover:opacity-70 transition-opacity">
            <span>Men</span>
            <CaretDown />
          </Link>
          <Link href="/categories" className="flex items-center gap-[2px] hover:opacity-70 transition-opacity">
            <span>Women</span>
            <CaretDown />
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 text-[#232321]"
          aria-label="Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>

        {/* Center Logo */}
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/images/logo.svg"
            alt="KICKS"
            width={128}
            height={32}
            className="h-[24px] lg:h-[32px] w-auto"
            priority
          />
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-[9px]  lg:gap-[40px] justify-end w-auto lg:w-[301px]">
          {/* Search */}
          <button
            type="button"
            className="text-[#232321] hover:opacity-70 transition-opacity hidden sm:block"
            aria-label="Search"
          >
            <SearchIcon />
          </button>

          {/* User */}
          <button
            type="button"
            className="text-[#232321] hover:opacity-70 transition-opacity"
            aria-label="User account"
          >
            <span className="hidden lg:block">
            <UserIcon width="24" height="24" />
            </span>
            <span className="block lg:hidden">
            <UserIcon />
            </span>
          </button>

          {/* Cart Badge */}
          <button
            type="button"
            onClick={() => dispatch(toggleCart())}
            className="bg-[#ffa52f] rounded-full w-[20px] h-[20px] p-[10px] lg:w-[32px] lg:h-[32px] flex items-center justify-center font-[family-name:var(--font-open-sans)] font-semibold text-[14px] lg:text-[16px] text-[#232321] hover:opacity-80 transition-opacity shrink-0"
            aria-label="Cart"
          >
            {cartItemCount}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="lg:hidden border-t border-gray-200 px-4 py-4 font-[family-name:var(--font-rubik)] font-semibold text-[16px] text-[#232321]">
          <div className="flex flex-col gap-4">
            <Link
              href="/products"
              className="flex items-center gap-1 hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>New Drops</span>
              <span>🔥</span>
            </Link>
            <Link
              href="/categories"
              className="flex items-center gap-[2px] hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Men</span>
              <CaretDown />
            </Link>
            <Link
              href="/categories"
              className="flex items-center gap-[2px] hover:opacity-70 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Women</span>
              <CaretDown />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
