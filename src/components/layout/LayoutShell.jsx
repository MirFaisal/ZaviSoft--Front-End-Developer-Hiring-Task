"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initializeCart } from "@/store";
import Header from "./Header";
import Footer from "./Footer";
import { Cart } from "@/components/cart";

export default function LayoutShell({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  return (
    <div className="max-w-360 mx-auto">
      <Header />
      <Cart />
      {children}
      <Footer />
    </div>
  );
}
