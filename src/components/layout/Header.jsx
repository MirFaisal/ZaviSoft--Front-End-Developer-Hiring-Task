"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemCount, toggleCart } from "@/store";

// Caret down icon for dropdown menus
function CaretDown() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M7 10L12 15L17 10"
        stroke="#232321"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
function UserIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
        stroke="#232321"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
        stroke="#232321"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const dispatch = useDispatch();
  const cartItemCount = useSelector(selectCartItemCount);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fafafa] rounded-[24px] mx-2 mt-2 md:mx-4 md:mt-4">
      <div className="flex items-center justify-between px-4 py-4 md:px-[60px] md:py-[32px]">
        {/* Left Navigation */}
        <nav className="hidden md:flex items-start gap-[40px] w-[331px] font-[family-name:var(--font-rubik)] font-semibold text-[16px] text-[#232321]">
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
          className="md:hidden p-2 text-[#232321]"
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
            className="h-[24px] md:h-[32px] w-auto"
            priority
          />
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-[24px] md:gap-[40px] justify-end w-auto md:w-[301px]">
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
            <UserIcon />
          </button>

          {/* Cart Badge */}
          <button
            type="button"
            onClick={() => dispatch(toggleCart())}
            className="bg-[#ffa52f] rounded-full w-[32px] h-[32px] flex items-center justify-center font-[family-name:var(--font-open-sans)] font-semibold text-[16px] text-[#232321] hover:opacity-80 transition-opacity shrink-0"
            aria-label="Cart"
          >
            {cartItemCount}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-200 px-4 py-4 font-[family-name:var(--font-rubik)] font-semibold text-[16px] text-[#232321]">
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
