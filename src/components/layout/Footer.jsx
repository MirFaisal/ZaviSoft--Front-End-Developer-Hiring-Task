"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "Runners", href: "/categories" },
  { name: "Sneakers", href: "/categories" },
  { name: "Basketball", href: "/categories" },
  { name: "Outdoor", href: "/categories" },
  { name: "Golf", href: "/categories" },
  { name: "Hiking", href: "/categories" },
];

const companyLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blogs", href: "/blogs" },
];

const socialLinks = [
  { name: "Facebook", icon: "/icons/facebook.svg", href: "#" },
  { name: "Instagram", icon: "/icons/instagram.svg", href: "#" },
  { name: "Twitter", icon: "/icons/twitter.svg", href: "#" },
  { name: "TikTok", icon: "/icons/tiktok.svg", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mx-4 lg:mx-10 xl:mx-15 mb-4 lg:mb-8">
      {/* ── Blue CTA Section ── */}
      <div className="relative bg-[#4a69e2] rounded-[48px] px-6 pt-10 pb-52 sm:pb-56 md:pb-60 lg:px-18 lg:pt-16 lg:pb-64">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
          {/* Left - Text + Form */}
          <div className="flex flex-col gap-6 max-w-xl">
            <h2 className="font-rubik font-bold text-3xl sm:text-4xl lg:text-5xl text-white uppercase leading-tight">
              Join our KicksPlus Club &amp; get 15% off
            </h2>
            <p className="font-open-sans font-semibold text-base sm:text-lg lg:text-xl text-[#e7e7e3]">
              Sign up for free! Join the community.
            </p>
            <form
              className="flex gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
            >
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 min-w-0 h-12 px-4 rounded-lg border border-white bg-transparent font-inter text-base text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                className="h-12 px-6 rounded-lg bg-[#232321] font-rubik font-medium text-sm text-white uppercase tracking-wider hover:bg-[#1a1a18] transition-colors cursor-pointer"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Right - KICKS Logo + Add Circle */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <Image
              src="/images/logo-white-outline.svg"
              alt="KICKS"
              width={300}
              height={80}
              className="w-auto h-16 xl:h-20"
            />
            <Image
              src="/icons/add-circle.svg"
              alt=""
              width={48}
              height={48}
              className="w-12 h-12"
            />
          </div>
        </div>
      </div>

      {/* ── Dark Footer Section (overlaps blue) ── */}
      <div className="relative -mt-44 sm:-mt-48 md:-mt-52 lg:-mt-52 bg-[#232321] rounded-[48px] overflow-hidden">
        {/* Top content */}
        <div className="px-6 pt-8 pb-8 lg:px-18 lg:pt-12 lg:pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {/* About Us */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="font-rubik font-semibold text-2xl lg:text-4xl text-[#ffa52f] mb-2">
                About us
              </h3>
              <p className="font-open-sans font-semibold text-base lg:text-xl text-[#e7e7e3] leading-relaxed">
                We are the biggest hyperstore in the universe. We got you all
                cover with our exclusive collections and latest drops.
              </p>
            </div>

            {/* Categories */}
            <div>
              <h3 className="font-rubik font-semibold text-xl lg:text-2xl text-[#ffa52f] mb-4">
                Categories
              </h3>
              <ul className="flex flex-col gap-2 font-open-sans font-semibold text-base lg:text-xl text-[#e7e7e3]">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <Link
                      href={cat.href}
                      className="hover:text-white transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-rubik font-semibold text-xl lg:text-2xl text-[#ffa52f] mb-4">
                Company
              </h3>
              <ul className="flex flex-col gap-2 font-open-sans font-semibold text-base lg:text-xl text-[#e7e7e3]">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="font-rubik font-semibold text-xl lg:text-2xl text-[#ffa52f] mb-4">
                Follow us
              </h3>
              <div className="flex gap-6 items-center">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    aria-label={social.name}
                    className="hover:opacity-70 transition-opacity"
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={24}
                      height={24}
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Large KICKS watermark logo */}
        <div className="px-4 lg:px-7 pb-4 lg:pb-6">
          <Image
            src="/images/logo-white.svg"
            alt="KICKS"
            width={1262}
            height={314}
            className="w-full h-auto opacity-90"
          />
        </div>
      </div>
    </footer>
  );
}
